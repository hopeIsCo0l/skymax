import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import './ProductDetail.css';

const products = [
  { id: 1, name: 'S-700 Reference Monitor', category: 'Studio Monitors', desc: 'Active 2-way nearfield monitor.', features: ['Bi-amplified design', 'Kevlar cone', 'Advanced DSP'] },
  { id: 2, name: 'S-800 Studio Subwoofer', category: 'Studio Monitors', desc: '10-inch active studio subwoofer.', features: ['Deep bass extension', 'Variable crossover', 'Phase switch'] },
  { id: 3, name: 'AeroLine Array Module', category: 'Live Sound', desc: 'High-SPL line array speaker.', features: ['140dB Max SPL', 'Weather resistant', 'Rigging hardware included'] },
  { id: 4, name: 'AeroSub Dual 18"', category: 'Live Sound', desc: 'Touring-grade subwoofer system.', features: ['Dual 18" drivers', '4000W peak power', 'Cardioid preset support'] },
  { id: 5, name: 'Podcaster Pro Mic', category: 'Broadcast', desc: 'Dynamic broadcast microphone.', features: ['Cardioid polar pattern', 'Internal pop filter', 'Shock mount included'] },
  { id: 6, name: 'Console V12', category: 'Broadcast', desc: '12-channel digital mixing console.', features: ['Motorized faders', 'USB audio interface', 'Built-in effects'] },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="container page-content">Product not found.</div>;

  return (
    <div className="container page-content">
      <Link to="/catalog" className="back-link">
        <ArrowLeft size={20} /> Back to Catalog
      </Link>
      
      <div className="product-detail-grid">
        <div className="product-gallery glass-panel">
          <div className="gallery-placeholder">Product Image</div>
        </div>
        
        <div className="product-details">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-desc">{product.desc}</p>
          
          <div className="features-list">
            <h3>Key Features</h3>
            <ul>
              {product.features?.map((f, i) => (
                <li key={i}><CheckCircle size={18} className="feature-icon" /> {f}</li>
              ))}
            </ul>
          </div>
          
          <Link to="/contact" className="btn btn-primary" style={{marginTop: '2rem'}}>
            Inquire About Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
