import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <section className="hero">
        <h1>Learn Coding with Confidence</h1>
        <p>Empowering visually impaired learners</p>
        <nav className="nav-buttons">
          <Link to="/courses" className="btn">Start Learning</Link>
          <Link to="/features" className="btn">How it works</Link>
          <a href="/features#accessibility" className="btn">Accessibility Features</a>
          <Link to="/tools" className="btn">Tools</Link>
        </nav>
      </section>

      <section className="courses">
        <h2>Featured Courses</h2>
        <div className="index-course-row">
          <div className="course-card">
            <h3>Python</h3>
            <p>Learn Python programming with our accessible curriculum</p>
            <Link to="/lesson?course=python-basics" className="btn">Start the Course</Link>
          </div>
          <div className="course-card">
            <h3>C++</h3>
            <p>Master C++ programming with step-by-step guidance</p>
            <Link to="/lesson?course=cpp" className="btn">Start the Course</Link>
          </div>
          <div className="course-card">
            <h3>Java</h3>
            <p>Build Java applications with our comprehensive course</p>
            <Link to="/lesson?course=java" className="btn">Start the Course</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home; 