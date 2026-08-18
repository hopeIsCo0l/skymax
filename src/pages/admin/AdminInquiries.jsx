import { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '../../services/db';
import { Mail, MessageSquare, Trash2, Eye, X, CheckCircle, Clock } from 'lucide-react';
import './AdminDashboard.css';

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const loadData = async () => {
    setLoading(true);
    const res = await getInquiries();
    setInquiries(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateInquiryStatus(id, newStatus);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this inquiry record?')) {
      await deleteInquiry(id);
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
      loadData();
    }
  };

  const filtered = inquiries.filter((inq) =>
    statusFilter === 'All' ? true : inq.status === statusFilter
  );

  return (
    <div className="dashboard-content">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Customer Inquiries & Quotes</h1>
          <p className="text-secondary">Process customer messages, technical consultation requests, and RFQs.</p>
        </div>

        <div className="catalog-filters" style={{ margin: 0 }}>
          {['All', 'New', 'In Review', 'Replied', 'Archived'].map((status) => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {loading ? (
          <p className="text-secondary">Loading inquiries...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
            <MessageSquare size={44} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p className="text-secondary">No customer inquiries found for filter &ldquo;{statusFilter}&rdquo;.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Subject & Preview</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inq) => (
                <tr key={inq.id}>
                  <td>{inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'Recent'}</td>
                  <td>
                    <strong>{inq.name}</strong>
                    <div className="text-secondary" style={{ fontSize: '0.8rem' }}>{inq.email}</div>
                    {inq.phone && <div className="text-muted" style={{ fontSize: '0.75rem' }}>{inq.phone}</div>}
                  </td>
                  <td>
                    <strong>{inq.subject}</strong>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {inq.message}
                    </p>
                  </td>
                  <td>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className={`status-select ${inq.status.toLowerCase().replace(' ', '-')}`}
                    >
                      <option value="New">New</option>
                      <option value="In Review">In Review</option>
                      <option value="Replied">Replied</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <button
                        title="View Full Message"
                        onClick={() => setSelectedInquiry(inq)}
                        style={{ color: 'var(--accent-blue)', padding: '0.4rem' }}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        title="Delete Inquiry"
                        onClick={() => handleDelete(inq.id)}
                        style={{ color: '#ff4444', padding: '0.4rem' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Inquiry Detail View Modal */}
      {selectedInquiry && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h2>Inquiry Details</h2>
              <button onClick={() => setSelectedInquiry(null)} className="close-modal-btn">
                <X size={20} />
              </button>
            </div>

            <div className="inquiry-detail-view">
              <div className="inquiry-meta-grid">
                <div>
                  <span className="spec-key">Customer:</span>
                  <p><strong>{selectedInquiry.name}</strong></p>
                </div>
                <div>
                  <span className="spec-key">Email:</span>
                  <p><a href={`mailto:${selectedInquiry.email}`} style={{ color: 'var(--accent-blue)' }}>{selectedInquiry.email}</a></p>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <span className="spec-key">Phone:</span>
                    <p>{selectedInquiry.phone}</p>
                  </div>
                )}
                <div>
                  <span className="spec-key">Status:</span>
                  <p><span className="badge badge-new">{selectedInquiry.status}</span></p>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <span className="spec-key">Subject:</span>
                <h3 style={{ marginTop: '0.25rem', marginBottom: '1rem' }}>{selectedInquiry.subject}</h3>
              </div>

              <div>
                <span className="spec-key">Message:</span>
                <div className="inquiry-message-box glass-panel">
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="modal-actions" style={{ marginTop: '2rem' }}>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(selectedInquiry.id, 'Replied')}
                >
                  <Mail size={18} /> Reply via Email
                </a>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
