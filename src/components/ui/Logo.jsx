import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = ({ size = 'medium', showTagline = true, to = '/' }) => {
  const content = (
    <div className={`skymax-brand-logo size-${size}`}>
      <div className="logo-symbol-wrapper">
        <svg
          className="logo-symbol-svg"
          viewBox="0 0 44 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skymaxBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#8a2be2" />
              <stop offset="100%" stopColor="#ff00ea" />
            </linearGradient>
            <filter id="skymaxNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Aerodynamic Acoustic Cloud Mark */}
          <path
            d="M12 28H32C36.4183 28 40 24.4183 40 20C40 15.9 36.9 12.5 32.8 12.1C31.8 5.8 26.4 1 20 1C14.3 1 9.4 4.7 7.7 9.9C3.3 10.7 0 14.5 0 19.2C0 24.1 3.9 28 8.8 28H12Z"
            stroke="url(#skymaxBrandGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#skymaxNeonGlow)"
            className="logo-cloud-path"
          />

          {/* Dynamic Audio Frequency Equalizer Soundbars */}
          <line x1="13" y1="22" x2="13" y2="17" stroke="#00f0ff" strokeWidth="2.4" strokeLinecap="round" className="logo-soundbar sb-1" />
          <line x1="18" y1="24" x2="18" y2="12" stroke="#00f0ff" strokeWidth="2.4" strokeLinecap="round" className="logo-soundbar sb-2" />
          <line x1="23" y1="25" x2="23" y2="9"  stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" className="logo-soundbar sb-3" />
          <line x1="28" y1="24" x2="28" y2="13" stroke="#ff00ea" strokeWidth="2.4" strokeLinecap="round" className="logo-soundbar sb-4" />
        </svg>
        <span className="logo-pulse-ring"></span>
      </div>

      <div className="logo-typography">
        <div className="logo-name-row">
          <span className="logo-name-sky">Sky</span>
          <span className="logo-name-max">Max</span>
          <span className="logo-badge-plc">PLC</span>
        </div>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="logo-link-anchor" aria-label="SkyMax PLC Homepage">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
