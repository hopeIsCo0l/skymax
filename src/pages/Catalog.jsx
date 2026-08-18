import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Catalog.css';

const products = [
  { id: 1, name: 'S-700 Reference Monitor', category: 'Studio Monitors', desc: 'Active 2-way nearfield monitor.' },
  { id: 2, name: 'S-800 Studio Subwoofer', category: 'Studio Monitors', desc: '10-inch active studio subwoofer.' },
  { id: 3, name: 'AeroLine Array Module', category: 'Live Sound', desc: 'High-SPL line array speaker.' },
  { id: 4, name: 'AeroSub Dual 18"', category: 'Live Sound', desc: 'Touring-grade subwoofer system.' },
  { id: 5, name: 'Podcaster Pro Mic', category: 'Broadcast', desc: 'Dynamic broadcast microphone.' },
  { id: 6, name: 'Console V12', category: 'Broadcast', desc: '12-channel digital mixing console.' },
];

const categories = ['All', 'Studio Monitors', 'Live Sound', 'Broadcast'];

const Catalog = () => {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

  return (
    <div className="container page-content">
      <div className="section-header">
        <h1 className="page-title">Product <span className="text-gradient">Catalog</span></h1>
        <p className="text-secondary">Explore our premium audio equipment ranges.</p>
      </div>

      <div className="catalog-filters">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map(product => (
          <div key={product.id} className="glass-panel product-card">
            <div className="product-img-placeholder">
              <span className="text-muted">Image</span>
            </div>
            <div className="product-info">
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="text-secondary">{product.desc}</p>
              <Link to={`/catalog/${product.id}`} className="view-details">
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
