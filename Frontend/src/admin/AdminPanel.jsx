import { Link, Routes, Route } from "react-router-dom";
import BannerAdmin from "./BannerAdmin";
import FlavorAdmin from "./FlavorAdmin";
import ManageMainSlider from "./ManageMainSlider";
import ManageCircleSlider from "./ManageCircleSlider";
import ProductAdmin from "./ProductAdmin";
import OrdersAdmin from "./OrdersAdmin"; // ✅ Orders Admin
import "../admin/admin.css";

const AdminPanel = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#f4f4f4", padding: "20px" }}>
        <h3 style={{ marginBottom: "20px" }}>Admin Panel</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/admin/banners">Banners</Link>
          <Link to="/admin/flavors">Flavors</Link>
          <Link to="/admin/main-slider">Main Slider</Link>
          <Link to="/admin/circle-slider">Circle Slider</Link>
          <Link to="/admin/products">Products</Link>
          <Link to="/admin/orders">Orders</Link> {/* ✅ NOW VISIBLE IN SIDEBAR */}
        </nav>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Routes>
          <Route path="banners" element={<BannerAdmin />} />
          <Route path="flavors" element={<FlavorAdmin />} />
          <Route path="main-slider" element={<ManageMainSlider />} />
          <Route path="circle-slider" element={<ManageCircleSlider />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} /> {/* ✅ Route */}
          <Route index element={<h2>Select a section</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
