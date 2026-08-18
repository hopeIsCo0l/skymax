import { Plus, Edit2, Trash2 } from 'lucide-react';
import './AdminDashboard.css'; // Reusing some table styles

const AdminProducts = () => {
  return (
    <div className="dashboard-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-page-title" style={{ marginBottom: 0 }}>Products Management</h1>
        <button className="btn btn-primary"><Plus size={18} /> Add Product</button>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>S-700 Reference Monitor</td>
              <td>Studio Monitors</td>
              <td>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ color: 'var(--text-secondary)' }}><Edit2 size={18} /></button>
                  <button style={{ color: '#ff4444' }}><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>AeroLine Array Module</td>
              <td>Live Sound</td>
              <td>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ color: 'var(--text-secondary)' }}><Edit2 size={18} /></button>
                  <button style={{ color: '#ff4444' }}><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
