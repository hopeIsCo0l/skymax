import { Cloud } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="container footer-content">
        <div className="footer-brand">
          <Cloud className="footer-icon" size={28} />
          <span className="brand-text">SkyMax <span className="text-gradient">PLC</span></span>
          <p className="footer-desc">Premium Sound Web Platform. High-fidelity audio solutions and equipment.</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>info@skymaxplc.com</p>
          <p>+1 (555) 019-2837</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SkyMax PLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
