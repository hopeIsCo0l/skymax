import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Search, Box } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/db';
import { CATEGORIES } from '../../data/defaultProducts';
import './AdminDashboard.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Studio Monitors',
    description: '',
    price_tag: 'Studio Grade',
    features: '',
    specifications: ''
  });

  const loadData = async () => {
    setLoading(true);
    const res = await getProducts();
    setProducts(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Studio Monitors',
      description: '',
      price_tag: 'Studio Grade',
      features: '',
      specifications: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    const feats = Array.isArray(product.features)
      ? product.features.join('\n')
      : typeof product.features === 'string'
      ? product.features
      : '';

    const specs = product.specifications && typeof product.specifications === 'object'
      ? Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join('\n')
      : '';

    setFormData({
      name: product.name || '',
      category: product.category || 'Studio Monitors',
      description: product.description || product.desc || '',
      price_tag: product.price_tag || 'Studio Grade',
      features: feats,
      specifications: specs
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const featuresArray = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const specsObject = {};
    formData.specifications.split('\n').forEach((line) => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join(':').trim();
        if (key && val) specsObject[key] = val;
      }
    });

    const payload = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      price_tag: formData.price_tag,
      features: featuresArray,
      specifications: specsObject
    };

    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }

    setModalOpen(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this product from the database?')) {
      await deleteProduct(id);
      loadData();
    }
  };

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-content">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title" style={{ marginBottom: '0.5rem' }}>Products Management</h1>
          <p className="text-secondary">Create, configure, and maintain hardware catalog items.</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div className="search-bar" style={{ margin: 0, maxWidth: '100%' }}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Filter catalog products by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        {loading ? (
          <p className="text-secondary">Loading products...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Box size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <p className="text-secondary">No products matched your search.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Tier / Price Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <strong>{product.name}</strong>
                    <div className="text-secondary" style={{ fontSize: '0.82rem', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.description || product.desc}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-new">{product.category}</span>
                  </td>
                  <td>{product.price_tag || 'Inquire'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      <button
                        title="Edit product"
                        onClick={() => openEditModal(product)}
                        style={{ color: 'var(--accent-blue)', padding: '0.4rem' }}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        title="Delete product"
                        onClick={() => handleDelete(product.id)}
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

      {/* Modal Dialog for Add/Edit */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Product' : 'Add New Hardware Product'}</h2>
              <button onClick={() => setModalOpen(false)} className="close-modal-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SkyMax S-900 Midfield Monitor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Tier / Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Studio Grade / Touring / Pro"
                    value={formData.price_tag}
                    onChange={(e) => setFormData({ ...formData, price_tag: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Overview of acoustic design and components..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Key Features (one per line)</label>
                <textarea
                  rows="3"
                  placeholder="Ultra-flat 30Hz - 24kHz response&#10;Class-D 500W Amplifier&#10;Dante Network Audio"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Technical Specifications (Format: Key: Value, one per line)</label>
                <textarea
                  rows="3"
                  placeholder="Max SPL: 124 dB @ 1m&#10;Frequency Range: 30Hz - 24kHz&#10;Inputs: XLR, AES/EBU"
                  value={formData.specifications}
                  onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={18} /> {editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
