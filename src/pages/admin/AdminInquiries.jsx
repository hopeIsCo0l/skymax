import './AdminDashboard.css';

const AdminInquiries = () => {
  return (
    <div className="dashboard-content">
      <h1 className="admin-page-title">Customer Inquiries</h1>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message Preview</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aug 18, 2026</td>
              <td>Alice Smith</td>
              <td>alice@example.com</td>
              <td style={{ color: 'var(--text-secondary)' }}>Interested in the AeroLine Array...</td>
              <td><span className="badge badge-new">New</span></td>
            </tr>
            <tr>
              <td>Aug 17, 2026</td>
              <td>Bob Jones</td>
              <td>bob@example.com</td>
              <td style={{ color: 'var(--text-secondary)' }}>Pricing for studio monitors?</td>
              <td><span className="badge badge-replied">Replied</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiries;
