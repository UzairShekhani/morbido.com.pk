import { Link, Routes, Route } from 'react-router-dom';
import BannerAdmin from './BannerAdmin';
import FlavorAdmin from './FlavorAdmin';
import ManageMainSlider from './ManageMainSlider';
import ManageCircleSlider from './ManageCircleSlider';
import ProductAdmin from './ProductAdmin'; // ✅ Import ProductAdmin
import "../admin/admin.css";

const AdminPanel = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '200px', background: '#eee', padding: '20px' }}>
        <h3>Admin Panel</h3>
        <Link to="/admin/banners">Banners</Link><br />
        <Link to="/admin/flavors">Flavors</Link><br />
        <Link to="/admin/main-slider">Main Slider</Link><br />
        <Link to="/admin/circle-slider">Circle Slider</Link><br />
        <Link to="/admin/products">Products</Link> {/* ✅ Add Product Link */}
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="banners" element={<BannerAdmin />} />
          <Route path="flavors" element={<FlavorAdmin />} />
          <Route path="main-slider" element={<ManageMainSlider />} />
          <Route path="circle-slider" element={<ManageCircleSlider />} />
          <Route path="products" element={<ProductAdmin />} /> {/* ✅ Route Added */}
          <Route index element={<h2>Select a section</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
