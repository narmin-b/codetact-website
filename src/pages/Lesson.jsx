import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';

const Lesson = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('course') || 'python-basics';
  
  const [activeLesson, setActiveLesson] = useState(lessons[courseId][0]);

  const handleNavClick = () => setMenuActive(false);
  
  const handleRunCode = async () => {
    setError('Failed to run code.');
  };

  return (
    <>
      <div className="lesson-main-container">
        <aside className="lesson-sidebar">
          {/* TODO: Migrate content from lesson.html here */}
          <h1>Lesson Page</h1>
        </aside>
        <main>
          {/* TODO: Migrate content from lesson.html here */}
          <h1>Lesson Page</h1>
        </main>
      </div>
    </>
  );
};

export default Lesson; 