import './About.css';

const About = () => {
  return (
    <div className="container page-content">
      <div className="section-header">
        <h1 className="page-title">About <span className="text-gradient">SkyMax PLC</span></h1>
        <p className="text-secondary">Pioneering the next dimension of sonic clarity.</p>
      </div>

      <div className="about-grid">
        <div className="glass-panel about-card">
          <h2>Our Mission</h2>
          <p className="text-secondary">
            At SkyMax PLC, our mission is to deliver uncompromising audio precision to professionals and audiophiles worldwide. We believe that sound is not just heard, but experienced.
          </p>
        </div>
        <div className="glass-panel about-card">
          <h2>Engineering Excellence</h2>
          <p className="text-secondary">
            With decades of combined experience in acoustics, electrical engineering, and digital signal processing, our team creates solutions that push the boundaries of what is possible in sound reproduction.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
