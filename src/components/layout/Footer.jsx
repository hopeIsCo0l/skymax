import Logo from '../ui/Logo';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="container footer-content">
        <div className="footer-brand">
          <Logo size="compact" showTagline={false} />
          <p className="footer-desc" style={{ marginTop: '0.85rem' }}>
            Premium Sound Web Platform. High-fidelity audio engineering, acoustics, and broadcast hardware.
          </p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/catalog">Catalog</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/admin" style={{ opacity: 0.65 }}>Admin Portal</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>info@skymaxplc.com</p>
          <p>+251 11 662 8930</p>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>Bole, Addis Ababa, Ethiopia</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SkyMax PLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
