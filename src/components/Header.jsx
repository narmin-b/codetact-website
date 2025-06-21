import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuToggle = () => setMenuActive((prev) => !prev);
  const handleNavClick = () => setMenuActive(false);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuActive && !event.target.closest('.main-nav')) {
        setMenuActive(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [menuActive]);

  return (
    <header>
      <nav className="main-nav">
        <Link to="/" aria-label="Go to homepage" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} onClick={handleNavClick}>
          <img src="/logo.png" alt="CodeTact logo: the word CodeTact with four Braille dots" width="88" height="88" style={{ marginRight: '0.75rem', display: 'block' }} />
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111' }}>CodeTact</span>
        </Link>
        <ul className={`nav-links${menuActive ? ' active' : ''}`}>
          <li><NavLink to="/" onClick={handleNavClick}>Home</NavLink></li>
          <li><NavLink to="/courses" onClick={handleNavClick}>Courses</NavLink></li>
          <li><NavLink to="/tools" onClick={handleNavClick}>Tools</NavLink></li>
          <li><a href="/about.html">About</a></li>
          <li><NavLink to="/features" onClick={handleNavClick}>Features</NavLink></li>
        </ul>
        <button className="menu-toggle" aria-label="Toggle navigation menu" onClick={handleMenuToggle}>☰</button>
      </nav>
    </header>
  );
};

export default Header; 