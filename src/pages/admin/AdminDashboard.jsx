import { Activity, Users, Box, TrendingUp } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-content">
      <h1 className="admin-page-title">Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Total Inquiries</h3>
            <Users className="stat-icon text-blue" size={24} />
          </div>
          <p className="stat-value">128</p>
          <span className="stat-change positive"><TrendingUp size={16} /> +12% this month</span>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Products</h3>
            <Box className="stat-icon text-magenta" size={24} />
          </div>
          <p className="stat-value">24</p>
          <span className="stat-change text-secondary">Active in catalog</span>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Site Traffic</h3>
            <Activity className="stat-icon text-purple" size={24} />
          </div>
          <p className="stat-value">8.4k</p>
          <span className="stat-change positive"><TrendingUp size={16} /> +5% this week</span>
        </div>
      </div>
      
      <div className="dashboard-recent glass-panel">
        <h2>Recent Inquiries</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alice Smith</td>
              <td>alice@example.com</td>
              <td>Aug 18, 2026</td>
              <td><span className="badge badge-new">New</span></td>
            </tr>
            <tr>
              <td>Bob Jones</td>
              <td>bob@example.com</td>
              <td>Aug 17, 2026</td>
              <td><span className="badge badge-replied">Replied</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
