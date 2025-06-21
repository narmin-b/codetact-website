import React from 'react';

const Features = () => {
  return (
    <>
      <main>
        <section className="features-hero">
          <h1>How CodeTact Works</h1>
          <p>Discover our innovative approach to accessible programming education</p>
        </section>

        <section id="accessibility" className="features-section">
          <h2>Accessibility Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Screen Reader Optimization</h3>
              <p>Our platform is fully optimized for screen readers, ensuring a seamless learning experience for visually impaired users.</p>
              <ul>
                <li>Semantic HTML structure</li>
                <li>ARIA labels and roles</li>
                <li>Keyboard navigation support</li>
                <li>Clear content hierarchy</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Audio Descriptions</h3>
              <p>Comprehensive audio descriptions for all visual content, making learning more accessible.</p>
              <ul>
                <li>Code explanation audio</li>
                <li>Visual concept descriptions</li>
                <li>Interactive element guidance</li>
                <li>Progress feedback</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>High Contrast Mode</h3>
              <p>Customizable color schemes and contrast options for better visibility.</p>
              <ul>
                <li>Multiple contrast themes</li>
                <li>Customizable text size</li>
                <li>Focus indicators</li>
                <li>Color blind friendly</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2>Learning Experience</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Interactive Code Editor</h3>
              <p>Our accessible code editor provides real-time feedback and assistance.</p>
              <ul>
                <li>Screen reader friendly</li>
                <li>Audio feedback</li>
                <li>Error highlighting</li>
                <li>Code completion</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Progress Tracking</h3>
              <p>Monitor your learning journey with our accessible progress tracking system.</p>
              <ul>
                <li>Audio progress updates</li>
                <li>Milestone celebrations</li>
                <li>Learning analytics</li>
                <li>Customizable goals</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>Community Support</h3>
              <p>Connect with other learners and mentors in our accessible community.</p>
              <ul>
                <li>Discussion forums</li>
                <li>Peer programming</li>
                <li>Mentor matching</li>
                <li>Resource sharing</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Features; 