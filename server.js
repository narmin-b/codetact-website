const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Create a temporary directory for code files
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

app.post('/compile', async (req, res) => {
  try {
    const { code, language } = req.body;
    const timestamp = Date.now();
    const fileName = `code_${timestamp}`;
    let fileExtension, command;

    // Configure language-specific settings
    switch (language) {
      case 'python':
        fileExtension = 'py';
        command = `python3 ${fileName}.${fileExtension}`;
        break;
      case 'javascript':
        fileExtension = 'js';
        command = `node ${fileName}.${fileExtension}`;
        break;
      case 'cpp':
        fileExtension = 'cpp';
        command = `g++ ${fileName}.${fileExtension} -o ${fileName} && ./${fileName}`;
        break;
      default:
        return res.status(400).json({ error: 'Unsupported language' });
    }

    // Write code to file
    const filePath = path.join(tempDir, `${fileName}.${fileExtension}`);
    await fs.promises.writeFile(filePath, code);

    // Execute code
    exec(command, { cwd: tempDir }, async (error, stdout, stderr) => {
      // Clean up files
      try {
        await fs.promises.unlink(filePath);
        if (language === 'cpp') {
          await fs.promises.unlink(path.join(tempDir, fileName));
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
  const apiKey = 'AIzaSyAWKDBsrEJANzqUj-DOHKLRQIv9N_t-qkM';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
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
    
    // Optional: Basic sanitization or fallback structure if rawText isn't well-formed
    const formattedFeedback = rawText.trim().startsWith('- **') ? rawText : `**AI Feedback:**\n\n${rawText}`;

    res.json({ feedback: formattedFeedback });
  } catch (error) {
    console.error('AI check failed:', error.message);
    res.status(500).json({ error: 'AI check failed', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});