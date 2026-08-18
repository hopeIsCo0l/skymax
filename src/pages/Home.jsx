import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Speaker, Mic } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-title">
            The Future of <span className="text-gradient">Acoustic Precision</span>
          </h1>
          <p className="hero-subtitle">
            SkyMax PLC delivers next-generation audio engineering, broadcasting hardware, and high-fidelity sound systems tailored for peak performance.
          </p>
          <div className="hero-cta">
            <Link to="/catalog" className="btn btn-primary glass-panel">
              Explore Catalog <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn btn-secondary glass-panel">
              Get in Touch
            </Link>
          </div>
        </div>
        
        {/* Abstract Soundwave Graphic */}
        <div className="soundwave-graphic">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
          <div className="wave wave-4"></div>
          <div className="wave wave-5"></div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="features container">
        <div className="section-header">
          <h2>Core Solutions</h2>
          <p className="text-secondary">Engineered for clarity, designed for impact.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card glass-panel">
            <Activity className="feature-icon" size={40} />
            <h3>Studio Monitoring</h3>
            <p className="text-secondary">Reference-grade monitors providing absolute truth in sound reproduction.</p>
          </div>
          <div className="feature-card glass-panel">
            <Speaker className="feature-icon" size={40} />
            <h3>Live Reinforcement</h3>
            <p className="text-secondary">Line arrays and subwoofers engineered for massive outdoor and indoor venues.</p>
          </div>
          <div className="feature-card glass-panel">
            <Mic className="feature-icon" size={40} />
            <h3>Broadcast Audio</h3>
            <p className="text-secondary">Low-latency, high-fidelity capture solutions for radio, TV, and podcasting.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
