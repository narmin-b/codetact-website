import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174'] 
}));

app.use(express.json());

const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

app.post('/compile', async (req, res) => {
  try {
    const { code, language } = req.body;
    const timestamp = Date.now();
    const uniqueId = `code_${timestamp}`;
    let fileExtension, command, filePath;

    switch (language) {
      case 'python':
        fileExtension = 'py';
        filePath = path.join(tempDir, `${uniqueId}.${fileExtension}`);
        command = `python3 "${filePath}"`;
        break;
      case 'javascript':
        fileExtension = 'js';
        filePath = path.join(tempDir, `${uniqueId}.${fileExtension}`);
        command = `node "${filePath}"`;
        break;
      case 'cpp':
        fileExtension = 'cpp';
        filePath = path.join(tempDir, `${uniqueId}.${fileExtension}`);
        const executablePath = path.join(tempDir, uniqueId);
        command = `g++ "${filePath}" -o "${executablePath}" && "${executablePath}"`;
        break;
      case 'java':
        fileExtension = 'java';
        const javaFileName = 'Main';
        filePath = path.join(tempDir, `${javaFileName}.${fileExtension}`);
        command = `javac "${filePath}" && java -cp "${tempDir}" ${javaFileName}`;
        break;
      default:
        return res.status(400).json({ error: 'Unsupported language' });
    }

    await fs.promises.writeFile(filePath, code);

    exec(command, { cwd: tempDir }, async (error, stdout, stderr) => {
      try {
        if (fs.existsSync(filePath)) await fs.promises.unlink(filePath);

        if (language === 'cpp') {
            const executablePath = path.join(tempDir, uniqueId);
            if(fs.existsSync(executablePath)) await fs.promises.unlink(executablePath);
        }
        if (language === 'java') {
            const classPath = path.join(tempDir, 'Main.class');
            if(fs.existsSync(classPath)) await fs.promises.unlink(classPath);
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }

      if (error) {
        return res.json({ error: stderr || error.message });
      }
      res.json({ output: stdout });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gemini AI code check endpoint
app.post('/ai-check', async (req, res) => {
  const { code, language } = req.body;
  // IMPORTANT: Do not expose your API key on the client-side.
  // This should be an environment variable on the server.
  const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyAWKDBsrEJANzqUj-DOHKLRQIv9N_t-qkM'; // Fallback for original key
  if (!apiKey) {
      return res.status(500).json({ error: 'AI API key is not configured on the server.' });
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const prompt = `
You're an expert developer. Analyze the following ${language} code and return feedback in the following structured format:
- **Errors**: List of actual code-breaking issues (if any)
- **Suggestions**: List of improvements or optimizations
- **Best Practices**: Any style or pattern advice
Do not return the original code. Format the response in Markdown.

\`\`\`${language}
${code}
\`\`\`
`;

  try {
    const response = await axios.post(endpoint, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No feedback received.';
    
    const formattedFeedback = rawText.trim().startsWith('- **') ? rawText : `**AI Feedback:**\n\n${rawText}`;

    res.json({ feedback: formattedFeedback });
  } catch (error) {
    console.error('AI check failed:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI check failed', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 