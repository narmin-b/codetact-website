import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>CodeTact</h4>
          <p>Empowering visually impaired learners to code with confidence</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about.html">About Us</a></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/tools">Tools</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@codetact.com</p>
          <p>Follow us on social media</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 CodeTact. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 