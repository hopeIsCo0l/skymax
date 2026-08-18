import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { createInquiry } from '../services/db';
import './Contact.css';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: productParam ? `Product Inquiry: ${productParam}` : '',
    message: productParam ? `Hello, I would like to request technical specifications and quote pricing for ${productParam}.` : ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productParam) {
      setFormData((prev) => ({
        ...prev,
        subject: `Product Inquiry: ${productParam}`,
        message: prev.message || `Hello, I would like to request technical specifications and quote pricing for ${productParam}.`
      }));
    }
  }, [productParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const res = await createInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'General Sound Engineering Consultation',
      message: formData.message
    });

    setSubmitting(false);

    if (res.error) {
      setError(`Submission error: ${res.error}`);
    } else {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <div className="container page-content">
      <div className="section-header">
        <h1 className="page-title">Contact <span className="text-gradient">SkyMax PLC</span></h1>
        <p className="text-secondary">Direct acoustic engineering consultation, touring sound design, and custom quotations.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="glass-panel info-card">
            <Mail className="info-icon" size={32} />
            <div>
              <h3>Direct Telemetry & Inquiries</h3>
              <p className="text-secondary">engineering@skymaxplc.com</p>
            </div>
          </div>
          <div className="glass-panel info-card">
            <Phone className="info-icon" size={32} />
            <div>
              <h3>Acoustics Hotline</h3>
              <p className="text-secondary">+1 (555) 019-2837</p>
            </div>
          </div>
          <div className="glass-panel info-card">
            <MapPin className="info-icon" size={32} />
            <div>
              <h3>Global Headquarters</h3>
              <p className="text-secondary">SkyMax Sound Labs, 404 Frequency Ave<br/>Acoustics Innovation Quarter</p>
            </div>
          </div>
        </div>
        
        <form className="glass-panel contact-form" onSubmit={handleSubmit}>
          <h2>Send Telemetry / Project Inquiry</h2>

          {success && (
            <div className="contact-alert success glass-panel">
              <CheckCircle size={20} className="alert-icon-success" />
              <div>
                <strong>Inquiry Transmitted Successfully!</strong>
                <p>Our acoustic solutions team has received your message and will respond within 24 hours.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="contact-alert error glass-panel">
              <AlertCircle size={20} className="alert-icon-error" />
              <div>
                <strong>Transmission Note:</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                required
                placeholder="jane@studio.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Phone / WhatsApp</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              placeholder="e.g. Studio Monitor Quotation"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Project Scope / Message *</label>
            <textarea
              rows="5"
              required
              placeholder="Describe your venue acoustics, room dimensions, or required sound reinforcement setup..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary submit-btn"
            disabled={submitting}
          >
            {submitting ? 'Transmitting Data...' : (
              <>
                <Send size={18} /> Transmit Inquiry
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
