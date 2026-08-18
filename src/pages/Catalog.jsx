import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Database, Sparkles, Volume2 } from 'lucide-react';
import { getProducts } from '../services/db';
import { CATEGORIES } from '../data/defaultProducts';
import './Catalog.css';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('local');
  const [activeCat, setActiveCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data || []);
      setDataSource(res.source || 'local');
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesCat = activeCat === 'All' || p.category === activeCat;
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description || p.desc || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container page-content">
      <div className="section-header">
        <h1 className="page-title">Product <span className="text-gradient">Catalog</span></h1>
        <p className="text-secondary">Precision acoustic systems, reference monitors, and pro touring gear.</p>
        
        <div className="catalog-status-badge">
          <Database size={14} />
          <span>Database: <strong>{dataSource === 'supabase' ? 'Supabase Live' : 'Local / Cached'}</strong></span>
        </div>
      </div>

      <div className="catalog-controls">
        <div className="search-bar glass-panel">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search audio gear by name or specification..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        <div className="catalog-filters">
          {CATEGORIES.map((cat) => (
            <button 
              key={cat} 
              className={`filter-btn ${activeCat === cat ? 'active' : ''}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-state glass-panel">
          <Volume2 className="pulse-icon" size={36} />
          <p>Loading sonic telemetry and hardware catalog...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state glass-panel">
          <p>No audio products found matching &ldquo;{searchQuery}&rdquo;.</p>
          <button className="btn btn-secondary" onClick={() => { setActiveCat('All'); setSearchQuery(''); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="glass-panel product-card">
              <div className="product-img-placeholder">
                <Volume2 size={36} className="product-icon-ambient" />
                {product.price_tag && (
                  <span className="price-tag-badge">{product.price_tag}</span>
                )}
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="text-secondary">{product.description || product.desc}</p>
                <Link to={`/catalog/${product.id}`} className="view-details">
                  View Specifications <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
