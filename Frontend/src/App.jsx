import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SliderMain from './components/SliderMain';
import CircleSlider from './components/CircleSlider';
import ProductPage from './components/ProductPage';
import AdminPanel from './admin/AdminPanel';
import Login from './admin/Login';
import AllProducts from "./components/AllProducts"; // ⬅️ Add this at the top

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Panel Route */}
        <Route
          path="/admin/*"
          element={token ? <AdminPanel /> : <Navigate to="/login" replace />}
        />

        {/* Public Routes */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Sidebar />
              <MainRoutes />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

// ✅ Public Routes
const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<SliderMain />} />
    <Route path="/fudge-bar" element={<CircleSlider title="Fudge Bar" />} />
    <Route path="/chocolate-delight" element={<CircleSlider title="Chocolate Delight" />} />
    <Route path="/cookie-details" element={<CircleSlider title="Cookie Details" />} />
    <Route path="/popsicle" element={<CircleSlider title="Popsicles" />} />
    <Route path="/premium" element={<CircleSlider title="Premiums" />} />
    <Route path="/icecreamproducts" element={<ProductPage />} />
    <Route path="/all-products" element={<AllProducts />} />

  </Routes>
);

export default App;
