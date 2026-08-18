import { Link } from 'react-router-dom';
import { Cloud, Menu, X } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar glass-panel">
      <div className="container nav-container">
        <Link to="/" className="brand">
          <Cloud className="brand-icon" size={32} />
          <span className="brand-text">SkyMax <span className="text-gradient">PLC</span></span>
        </Link>
        
        <div className="nav-right">
          <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/catalog" onClick={() => setIsOpen(false)}>Catalog</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/admin" className="admin-link" onClick={() => setIsOpen(false)}>Admin</Link>
            <div className="nav-mobile-theme">
              <ThemeToggle showLabels />
            </div>
          </nav>

          <div className="nav-actions">
            <ThemeToggle className="nav-desktop-theme" />
            <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
