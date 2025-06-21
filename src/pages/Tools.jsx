import React from 'react';
import { Link } from 'react-router-dom';

const Tools = () => {
  return (
    <>
      <main>
        <section className="tools-hero">
          <h1>Development Tools</h1>
          <p>Accessible tools and resources to enhance your coding experience</p>
        </section>

        <section className="course-categories">
          <div className="category">
            <h2>Code Editor</h2>
            <div className="course-grid">
              <div className="course-card">
                <h3>CodeTact Editor</h3>
                <p>Our custom-built, accessible code editor with screen reader support and audio feedback.</p>
                <ul className="course-features">
                  <li>Real-time syntax highlighting</li>
                  <li>Audio code navigation</li>
                  <li>Error detection and feedback</li>
                  <li>Code completion suggestions</li>
                </ul>
                <a href="editor.html" className="btn">Try Editor</a>
              </div>
            </div>
          </div>

          <div className="category">
            <h2>Learning Resources</h2>
            <div className="course-grid">
              <div className="course-card">
                <h3>Code Documentation</h3>
                <p>Accessible documentation for all programming languages and frameworks.</p>
                <ul className="course-features">
                  <li>Screen reader optimized</li>
                  <li>Audio explanations</li>
                  <li>Interactive examples</li>
                  <li>Search functionality</li>
                </ul>
                <a href="docs.html" className="btn">View Docs</a>
              </div>
              <div className="course-card">
                <h3>Practice Exercises</h3>
                <p>Interactive coding challenges with audio feedback and hints.</p>
                <ul className="course-features">
                  <li>Difficulty levels</li>
                  <li>Audio hints</li>
                  <li>Progress tracking</li>
                  <li>Solution explanations</li>
                </ul>
                <a href="exercises.html" className="btn">Start Practice</a>
              </div>
            </div>
          </div>

          <div className="category">
            <h2>Community Tools</h2>
            <div className="course-grid">
              <div className="course-card">
                <h3>Code Sharing</h3>
                <p>Share and collaborate on code with other learners.</p>
                <ul className="course-features">
                  <li>Accessible code review</li>
                  <li>Audio comments</li>
                  <li>Version control</li>
                  <li>Collaboration tools</li>
                </ul>
                <a href="share.html" className="btn">Share Code</a>
              </div>
              <div className="course-card">
                <h3>Discussion Forum</h3>
                <p>Connect with other learners and mentors.</p>
                <ul className="course-features">
                  <li>Screen reader friendly</li>
                  <li>Topic categories</li>
                  <li>Search functionality</li>
                  <li>Notification system</li>
                </ul>
                <a href="forum.html" className="btn">Join Forum</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Tools; 