import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Logo from '../ui/Logo';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar glass-panel">
      <div className="nav-container">
        <Logo size="medium" />

        <div className="nav-right">
          <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/catalog" onClick={() => setIsOpen(false)}>Catalog</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
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
