import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on link click
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link" onClick={handleCloseMenu}>
            <i className="fas fa-graduation-cap"></i>
            Placement Portal
          </Link>
        </div>
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={handleCloseMenu}>
            Home
          </Link>
          <Link to="/dashboard" className="nav-link" onClick={handleCloseMenu}>
            Dashboard
          </Link>
          <Link to="/admin" className="nav-link" onClick={handleCloseMenu}>
            Admin
          </Link>

          <div className="auth-buttons">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="login-btn">Login</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
        </div>

        <div
          className={`hamburger${isMenuOpen ? " active" : ""}`}
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
