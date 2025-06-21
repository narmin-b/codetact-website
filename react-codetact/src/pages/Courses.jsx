import React from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  return (
    <>
      <main>
        <section className="hero">
          <h1>Our Courses</h1>
          <p>Choose from our selection of accessible programming courses</p>
          <nav className="nav-buttons">
            <a href="#beginner" className="btn">Beginner Courses</a>
            <a href="#intermediate" className="btn">Intermediate Courses</a>
            <Link to="/features" className="btn">How it works</Link>
            <Link to="/tools" className="btn">Tools</Link>
          </nav>
        </section>

        <section className="course-categories">
          <div className="category" id="beginner">
            <h2>Beginner Friendly</h2>
            <div className="course-grid">
              <div className="course-card">
                <h3>Python Basics</h3>
                <p>Learn Python programming from scratch with our accessible curriculum</p>
                <ul className="course-features">
                  <li>Interactive lessons</li>
                  <li>Screen reader optimized</li>
                  <li>Audio descriptions</li>
                  <li>Practice exercises</li>
                </ul>
                <Link to="/lesson?course=python-basics" className="btn">Start Learning</Link>
              </div>
              <div className="course-card">
                <h3>Web Development</h3>
                <p>Master HTML, CSS, and JavaScript with accessibility in mind</p>
                <ul className="course-features">
                  <li>Step-by-step tutorials</li>
                  <li>Accessible code examples</li>
                  <li>Real-world projects</li>
                  <li>Community support</li>
                </ul>
                <Link to="/lesson?course=web-dev" className="btn">Start Learning</Link>
              </div>
            </div>
          </div>

          <div className="category" id="intermediate">
            <h2>Intermediate</h2>
            <div className="course-grid">
              <div className="course-card">
                <h3>Java Programming</h3>
                <p>Build robust applications with Java</p>
                <ul className="course-features">
                  <li>Object-oriented programming</li>
                  <li>Advanced concepts</li>
                  <li>Project-based learning</li>
                  <li>Code review sessions</li>
                </ul>
                <Link to="/lesson?course=java" className="btn">Start Learning</Link>
              </div>
              <div className="course-card">
                <h3>C++ Development</h3>
                <p>Learn C++ programming with a focus on accessibility</p>
                <ul className="course-features">
                  <li>Memory management</li>
                  <li>Data structures</li>
                  <li>Algorithm design</li>
                  <li>Performance optimization</li>
                </ul>
                <Link to="/lesson?course=cpp" className="btn">Start Learning</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Courses; 