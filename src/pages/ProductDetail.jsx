import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Volume2, ShieldCheck, Zap, Mail } from 'lucide-react';
import { getProductById } from '../services/db';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const res = await getProductById(id);
      setProduct(res.data);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container page-content">
        <div className="loading-state glass-panel">
          <Volume2 className="pulse-icon" size={36} />
          <p>Retrieving product specifications...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container page-content">
        <div className="empty-state glass-panel">
          <h2>Product Not Found</h2>
          <p className="text-secondary">The requested sound equipment could not be found in our database.</p>
          <Link to="/catalog" className="btn btn-primary">
            <ArrowLeft size={18} /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const features = Array.isArray(product.features)
    ? product.features
    : typeof product.features === 'string'
    ? JSON.parse(product.features || '[]')
    : [];

  const specifications = product.specifications && typeof product.specifications === 'object'
    ? product.specifications
    : {};

  return (
    <div className="container page-content">
      <Link to="/catalog" className="back-link">
        <ArrowLeft size={20} /> Back to Catalog
      </Link>
      
      <div className="product-detail-grid">
        <div className="product-gallery glass-panel">
          <div className="gallery-inner">
            <Volume2 size={80} className="detail-gear-icon" />
            <span className="gallery-badge">{product.price_tag || 'Studio Telemetry'}</span>
          </div>
        </div>
        
        <div className="product-details">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-desc">{product.description || product.desc}</p>
          
          {features.length > 0 && (
            <div className="features-list">
              <h3>Key Engineering Highlights</h3>
              <ul>
                {features.map((f, i) => (
                  <li key={i}>
                    <CheckCircle size={18} className="feature-icon" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(specifications).length > 0 && (
            <div className="specs-section">
              <h3>Technical Specifications</h3>
              <div className="specs-table glass-panel">
                {Object.entries(specifications).map(([key, val]) => (
                  <div key={key} className="spec-row">
                    <span className="spec-key">{key}</span>
                    <span className="spec-val">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="detail-actions">
            <Link
              to={`/contact?product=${encodeURIComponent(product.name)}`}
              className="btn btn-primary"
            >
              <Mail size={18} /> Inquire / Request Quote
            </Link>
            <div className="guarantee-pill">
              <ShieldCheck size={16} /> 3-Year SkyMax Pro Warranty Included
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
