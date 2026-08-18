import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Users, Box, TrendingUp, Database, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getProducts, getInquiries } from '../../services/db';
import { isSupabaseConfigured } from '../../lib/supabase';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('local');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [prodRes, inqRes] = await Promise.all([getProducts(), getInquiries()]);
      setProducts(prodRes.data || []);
      setInquiries(inqRes.data || []);
      setDataSource(prodRes.source || 'local');
      setLoading(false);
    };

    fetchData();
  }, []);

  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="dashboard-content">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Telemetry & System Overview</h1>
          <p className="text-secondary">Real-time status of catalog items, customer inquiries, and database link.</p>
        </div>

        <div className={`db-connection-pill ${isSupabaseConfigured ? 'online' : 'cached'}`}>
          <Database size={16} />
          <span>{isSupabaseConfigured ? 'Supabase Connected' : 'Local Fallback Storage'}</span>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Total Inquiries</h3>
            <Users className="stat-icon text-blue" size={24} />
          </div>
          <p className="stat-value">{loading ? '...' : inquiries.length}</p>
          <span className="stat-change positive">
            <TrendingUp size={16} /> {newInquiriesCount} new pending action
          </span>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>Active Catalog Gear</h3>
            <Box className="stat-icon text-magenta" size={24} />
          </div>
          <p className="stat-value">{loading ? '...' : products.length}</p>
          <span className="stat-change text-secondary">
            Products registered in database
          </span>
        </div>
        
        <div className="stat-card glass-panel">
          <div className="stat-header">
            <h3>System Status</h3>
            <Activity className="stat-icon text-purple" size={24} />
          </div>
          <p className="stat-value">100%</p>
          <span className="stat-change positive">
            <CheckCircle2 size={16} /> Acoustic nodes operational
          </span>
        </div>
      </div>
      
      <div className="dashboard-recent glass-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Recent Customer Inquiries</h2>
          <Link to="/admin/inquiries" className="view-details">
            Manage Inquiries <ArrowRight size={16} />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <p className="text-muted">No inquiries logged yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <strong>{inq.name}</strong>
                    <div className="text-secondary" style={{ fontSize: '0.8rem' }}>{inq.email}</div>
                  </td>
                  <td>{inq.subject}</td>
                  <td>{inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'Recent'}</td>
                  <td>
                    <span className={`badge ${inq.status === 'New' ? 'badge-new' : 'badge-replied'}`}>
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
