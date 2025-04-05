import { Link, Routes, Route, useLocation } from "react-router-dom";
import BannerAdmin from "./BannerAdmin";
import FlavorAdmin from "./FlavorAdmin";
import ManageMainSlider from "./ManageMainSlider";
import ManageCircleSlider from "./ManageCircleSlider";
import ProductAdmin from "./ProductAdmin";
import OrdersAdmin from "./OrdersAdmin";
import "../admin/admin.css";

const AdminPanel = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/admin/banners", label: " Banners" },
    { path: "/admin/flavors", label: "Flavors" },
    { path: "/admin/main-slider", label: " Main Slider" },
    { path: "/admin/circle-slider", label: " Circle Slider" },
    { path: "/admin/products", label: " Products" },
    { path: "/admin/orders", label: " Orders" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        background: "#1f2937",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}>
        <h2 style={{ marginBottom: "20px", fontSize: "20px" }}> Admin Dashboard</h2>
        {navLinks.map((link) => (
          
          <Link
            key={link.path}
            to={link.path}
            style={{
              textDecoration: "none",
              color: location.pathname === link.path ? "#10b981" : "#fff",
              padding: "10px 15px",
              marginBottom: "8px",
              backgroundColor: location.pathname === link.path ? "#374151" : "transparent",
              borderRadius: "6px",
              transition: "background-color 0.3s",
            }}
          >
            {link.label}
          </Link>
        ))}
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: "25px", overflowY: "auto", backgroundColor: "#f9fafb" }}>
        <Routes>
          <Route path="banners" element={<BannerAdmin />} />
          <Route path="flavors" element={<FlavorAdmin />} />
          <Route path="main-slider" element={<ManageMainSlider />} />
          <Route path="circle-slider" element={<ManageCircleSlider />} />
          <Route path="products" element={<ProductAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route index element={<h2 style={{ color: "#374151" }}>👈 Please select a section from the sidebar.</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;
