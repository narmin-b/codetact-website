import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import '../style.css';

// Placeholder lesson data - this would typically come from a database or API
const lessons = {
  "python-basics": [
    { 
      id: 1, 
      title: "Introduction", 
      content: "Welcome to Python Basics! Python is a versatile and beginner-friendly language. In this lesson, you'll learn the fundamentals of Python syntax, how to display text to the screen, and how to write your first program. The code editor on the right contains your first line of code. Try running it!", 
      code: "print(\"Hello, CodeTact!\")" 
    },
    { 
      id: 2, 
      title: "Variables", 
      content: "Variables are used to store data. In Python, you can create a variable by giving it a name and assigning it a value. This lesson covers how to create string, integer, and float variables and how to print them.", 
      code: "message = \"This is a variable\"\nprint(message)\n\nnumber = 10\nprint(number)"
    },
    { 
      id: 3, 
      title: "Loops", 
      content: "Loops allow you to execute a block of code multiple times. The 'for' loop is used for iterating over a sequence (like a list or a range). This example shows a loop that prints numbers from 0 to 4.", 
      code: "for i in range(5):\n  print(f\"Loop iteration: {i}\")" 
    },
    { 
      id: 4, 
      title: "Functions", 
      content: "Functions are blocks of reusable code that perform a specific action. You define a function using the 'def' keyword. This lesson teaches you how to create and call a simple function.", 
      code: "def greet(name):\n  print(f\"Hello, {name}!\")\n\ngreet(\"Learner\")" 
    },
    { 
      id: 5, 
      title: "Practice", 
      content: "Time to practice what you've learned! Try writing a function that takes a number as an argument and prints whether it's even or odd. Use the modulo operator (%) to check.", 
      code: "# Write your practice code here" 
    }
  ],
  "web-dev": [
    { id: 1, title: "HTML Basics", content: "HTML forms the skeleton of a webpage. This lesson introduces basic tags.", code: "<h1>Welcome to Web Dev</h1>\n<p>This is a paragraph.</p>" }
  ],
  "java": [
    { id: 1, title: "Java Introduction", content: "Java is a powerful, object-oriented language. Let's start with the basics.", code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}' }
  ],
  "cpp": [
    { id: 1, title: "C++ Introduction", content: "C++ is known for its performance. Here is your first program.", code: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!";\n    return 0;\n}' }
  ]
};

const Lesson = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const courseId = searchParams.get('course') || 'python-basics';
  
  const courseLessons = lessons[courseId] || [];
  const [activeLesson, setActiveLesson] = useState({});
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [aiFeedback, setAiFeedback] = useState('');
  const [isRunLoading, setIsRunLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const titleRef = useRef(null);

  const languageMap = {
    'python-basics': 'python',
    'web-dev': 'javascript',
    'java': 'java',
    'cpp': 'cpp',
  };
  const language = languageMap[courseId] || 'plaintext';

  useEffect(() => {
    const newCourseLessons = lessons[courseId] || [];
    const newIndex = 0;
    const newLesson = newCourseLessons.length > 0 
      ? newCourseLessons[newIndex] 
      : { id: 'not-found', title: "Course Not Found", content: `The course "${courseId}" does not exist.`, code: "" };
    
    setActiveLessonIndex(newIndex);
    setActiveLesson(newLesson);
    setCode(newLesson.code);
    setOutput('');
    setAiFeedback('');
  }, [courseId]);

  const switchLesson = (index) => {
    if (index >= 0 && index < courseLessons.length) {
      const newLesson = courseLessons[index];
      setActiveLessonIndex(index);
      setActiveLesson(newLesson);
      setCode(newLesson.code);
      setOutput('');
      setAiFeedback('');
      setTimeout(() => titleRef.current?.focus(), 0);
    }
  };

  const handlePrevious = () => switchLesson(activeLessonIndex - 1);

  const handleNext = () => {
    const isLastLesson = activeLessonIndex === courseLessons.length - 1;
    if (isLastLesson) {
      navigate('/courses');
    } else {
      switchLesson(activeLessonIndex + 1);
    }
  };

  const progress = courseLessons.length > 0 ? ((activeLessonIndex + 1) / courseLessons.length) * 100 : 0;
  const handleRunCode = useCallback(async () => {
    setIsRunLoading(true);
    try {
      const response = await fetch('http://localhost:3001/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const result = await response.json();
      setOutput(result.error ? `Error: ${result.error}` : result.output);
    } catch (error) {
      setOutput(`Failed to connect to the server: ${error.message}`);
    }
    setIsRunLoading(false);
  }, [code, language]);

  const handleCheckAI = useCallback(async () => {
    setIsAiLoading(true);
    try {
      const response = await fetch('http://localhost:3001/ai-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const result = await response.json();
      setAiFeedback(result.error ? `Error: ${result.error}` : result.feedback);
    } catch (error) {
      setAiFeedback(`Failed to connect to the server: ${error.message}`);
    }
    setIsAiLoading(false);
  }, [code, language]);

  return (
    <div className="lesson-container-new">
      <div className="lesson-header">
        <h2>{courseId.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
        
        {/* Horizontal Syllabus */}
        <nav className="lesson-topic-nav">
          {courseLessons.map((lesson, index) => (
            <button
              key={lesson.id}
              className={`topic-btn ${index === activeLessonIndex ? 'active' : ''}`}
              onClick={() => switchLesson(index)}
            >
              {lesson.title}
            </button>
          ))}
        </nav>

        {/* Next/Previous Buttons */}
        <div className="lesson-navigation-buttons">
            {activeLessonIndex > 0 && (
                <button onClick={handlePrevious} className="btn">&larr; Previous</button>
            )}
            <button onClick={handleNext} className="btn">
                {activeLessonIndex === courseLessons.length - 1 ? 'Finish Course' : 'Next →'}
            </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="lesson-body-content">
        {/* Left Column: Lesson Description */}
        <aside className="lesson-description-column">
          <div className="lesson-introduction">
            <h3 ref={titleRef} tabIndex="-1">{activeLesson.title}</h3>
            <p>{activeLesson.content}</p>
          </div>
        </aside>

        {/* Right Column: Interactive Area */}
        <main className="lesson-interactive-column">
          <div className="lesson-editor-container">
            <div className="lesson-controls">
                <button onClick={handleRunCode} disabled={isRunLoading || isAiLoading} className="btn">
                    {isRunLoading ? 'Running...' : 'Run Code'}
                </button>
                <button onClick={handleCheckAI} disabled={isRunLoading || isAiLoading} className="btn">
                    {isAiLoading ? 'Checking...' : 'Check with AI'}
                </button>
            </div>
            <Editor
              height="250px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14, wordWrap: 'on' }}
            />
          </div>

          <div className="lesson-output-container">
            <div className="output-box-separate" role="status" aria-live="polite">
              <h4>Output</h4>
              {isRunLoading ? <div className="loader"></div> : <pre>{output || "Click 'Run Code' to see the output."}</pre>}
            </div>

            <div className="ai-feedback-box" role="status" aria-live="polite">
              <h4>AI Feedback</h4>
              {isAiLoading ? <div className="loader"></div> : (
                aiFeedback ? <div className="ai-feedback-markdown"><ReactMarkdown>{aiFeedback}</ReactMarkdown></div> : <p className="placeholder-text">Click 'Check with AI' for feedback.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Lesson; 