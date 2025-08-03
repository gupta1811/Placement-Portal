import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link" onClick={handleCloseMenu}>
            <i className="fas fa-graduation-cap"></i>
            Placement Portal
          </Link>
        </div>
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={handleCloseMenu}>
            Home
          </Link>
          <Link to="/admin" className="nav-link" onClick={handleCloseMenu}>
            Admin
          </Link>
        </div>
        <div
          className={`hamburger${isMenuOpen ? ' active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
          role="button"
          tabIndex={0}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
