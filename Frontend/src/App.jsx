import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import FlavorsPage from "./components/FlavorsPage";
import Sidebar from "./components/Sidebar";
import SliderMain from "./components/SliderMain";
import CircleSlider from "./components/CircleSlider";
import ProductPage from "./components/ProductPage";
import AdminPanel from "./admin/AdminPanel";
import Login from "./admin/Login";
import Checkout from "./components/Checkout";
import AllProducts from "./components/AllProducts";
import { Toaster } from "react-hot-toast";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={token ? <AdminPanel /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<><Navbar /><Sidebar /><MainRoutes /></>} />
      </Routes>
    </Router>
  );
}

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<SliderMain />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/flavors" element={<FlavorsPage />} />
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
