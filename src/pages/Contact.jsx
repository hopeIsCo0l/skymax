import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="container page-content">
      <div className="section-header">
        <h1 className="page-title">Contact <span className="text-gradient">SkyMax</span></h1>
        <p className="text-secondary">Get in touch with our engineering team for custom solutions.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="glass-panel info-card">
            <Mail className="info-icon" size={32} />
            <div>
              <h3>Email Us</h3>
              <p className="text-secondary">info@skymaxplc.com</p>
            </div>
          </div>
          <div className="glass-panel info-card">
            <Phone className="info-icon" size={32} />
            <div>
              <h3>Call Us</h3>
              <p className="text-secondary">+1 (555) 019-2837</p>
            </div>
          </div>
          <div className="glass-panel info-card">
            <MapPin className="info-icon" size={32} />
            <div>
              <h3>Headquarters</h3>
              <p className="text-secondary">Sonic Tower, 404 Audio Way<br/>Tech District</p>
            </div>
          </div>
        </div>
        
        <form className="glass-panel contact-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Send an Inquiry</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" placeholder="Tell us about your audio needs..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
