import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, LogOut, Cloud } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="admin-container">
      <aside className="admin-sidebar glass-panel">
        <div className="admin-brand">
          <Cloud className="brand-icon" size={32} />
          <span>SkyMax Admin</span>
        </div>
        
        <nav className="admin-nav">
          <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/products" className={location.pathname === '/admin/products' ? 'active' : ''}>
            <Package size={20} /> Products
          </Link>
          <Link to="/admin/inquiries" className={location.pathname === '/admin/inquiries' ? 'active' : ''}>
            <MessageSquare size={20} /> Inquiries
          </Link>
        </nav>
        
        <div className="admin-footer">
          <Link to="/" className="back-home"><LogOut size={20} /> Exit Admin</Link>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header glass-panel">
          <h2>Admin Portal</h2>
          <div className="admin-profile">
            <div className="avatar">A</div>
            <span>Admin User</span>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
