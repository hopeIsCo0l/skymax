import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Check, Search, Box, UploadCloud, Link as LinkIcon, Sparkles, Image as ImageIcon } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/db';
import { CATEGORIES } from '../../data/defaultProducts';
import './AdminDashboard.css';

const PRESET_IMAGES = [
  { label: 'Studio Monitor', url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Line Array', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Microphone', url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80' },
  { label: 'DSP Mixer', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80' },
  { label: 'Subwoofer', url: 'https://images.unsplash.com/photo-1520523839898-50712704044b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Acoustic Panel', url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80' },
];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageInputTab, setImageInputTab] = useState('url');
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Studio Monitors',
    description: '',
    price_tag: 'Studio Grade',
    image_url: '',
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
    setImageInputTab('url');
    setFormData({
      name: '',
      category: 'Studio Monitors',
      description: '',
      price_tag: 'Studio Grade',
      image_url: '',
      features: '',
      specifications: ''
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setImageInputTab('url');
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
      image_url: product.image_url || '',
      features: feats,
      specifications: specs
    });
    setModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
      image_url: formData.image_url,
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
                <th>Product</th>
                <th>Category</th>
                <th>Tier / Price Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      <div className="admin-product-thumb">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <Box size={20} />
                        )}
                      </div>
                      <div>
                        <strong>{product.name}</strong>
                        <div
                          className="text-secondary"
                          style={{
                            fontSize: '0.82rem',
                            maxWidth: '340px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {product.description || product.desc}
                        </div>
                      </div>
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

              {/* Product Image Section */}
              <div className="form-group image-field-section">
                <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Product Image</span>
                  <span className="text-secondary" style={{ fontSize: '0.78rem' }}>Optional</span>
                </label>

                {formData.image_url ? (
                  <div className="image-preview-box">
                    <div className="image-preview-img-wrap">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="image-preview-info">
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.2rem' }}>
                        Image Ready
                      </div>
                      <div className="image-preview-url">
                        {formData.image_url.startsWith('data:') ? 'Local Image File (Uploaded)' : formData.image_url}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => setFormData({ ...formData, image_url: '' })}
                    >
                      <X size={14} /> Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="image-input-type-toggle">
                      <button
                        type="button"
                        className={`input-tab-btn ${imageInputTab === 'url' ? 'active' : ''}`}
                        onClick={() => setImageInputTab('url')}
                      >
                        <LinkIcon size={14} /> Direct Image URL
                      </button>
                      <button
                        type="button"
                        className={`input-tab-btn ${imageInputTab === 'upload' ? 'active' : ''}`}
                        onClick={() => setImageInputTab('upload')}
                      >
                        <UploadCloud size={14} /> Upload Local File
                      </button>
                    </div>

                    {imageInputTab === 'url' ? (
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or https://cdn.site.com/item.jpg"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      />
                    ) : (
                      <div
                        className="file-dropzone"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadCloud size={28} />
                        <p>Click to select an image from your computer</p>
                        <span>Supports PNG, JPG, WebP, SVG up to 5MB</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={handleFileUpload}
                        />
                      </div>
                    )}

                    <div className="image-presets-row">
                      <span className="text-secondary" style={{ fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Sparkles size={12} /> Quick Presets:
                      </span>
                      {PRESET_IMAGES.map((p) => (
                        <button
                          key={p.label}
                          type="button"
                          className="preset-chip"
                          onClick={() => setFormData({ ...formData, image_url: p.url })}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
