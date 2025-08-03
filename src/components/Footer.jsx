import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Placement Portal</h3>
          <p>Connecting students with career opportunities</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/companies">Companies</a></li>
            <li><a href="/admin">Admin Panel</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p><i className="fas fa-envelope"></i> placement@college.edu</p>
            <p><i className="fas fa-phone"></i> +91 123 456 7890</p>
            <p><i className="fas fa-map-marker-alt"></i> College Campus, City</p>
          </div>
        </div>
        <div className="footer-section">
          <h4>Important Links</h4>
          <ul>
            <li><a href="/guidelines">Placement Guidelines</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Placement Portal. All rights reserved.</p>
        <p>Made with <i className="fas fa-heart" style={{color: "#e74c3c"}}></i> by Students</p>
      </div>
    </div>
  </footer>
);

export default Footer;
