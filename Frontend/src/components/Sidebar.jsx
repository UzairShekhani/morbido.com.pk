import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ hideBars }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (url) => {
    setOpen(false);
    navigate(url);
  };

  return (
    <>
      {/* Header container for Bars + Cart */}
      <div className="mor-header-icons">
        {/* ✅ Hamburger Bars (conditionally hidden if cart is open) */}
        {!hideBars && (
          <div
            className={`mor-toggle-btn ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <div className="mor-bar"></div>
            <div className="mor-bar"></div>
            <div className="mor-bar"></div>
          </div>
        )}

        {/* Cart Icon - this will be controlled by Navbar already */}
        {/* Cart logic is now managed inside Navbar so no click handler here */}
      </div>

      {/* Sidebar */}
      <aside className={`mor-sidebar ${open ? "open" : ""}`}>
        <br />
        <br />
        <br />
        <ul>
          <li onClick={() => handleNavigate("/")}>Home</li>
          <li onClick={() => handleNavigate("/all-products")}>All Products</li>
          <li onClick={() => handleNavigate("/flavors")}>Flavors</li>
          <li onClick={() => handleNavigate("/fudge-bar")}>Chocolate Fudge</li>
          <li onClick={() => handleNavigate("/chocolate-delight")}>Delights</li>
          <li onClick={() => handleNavigate("/cookie-details")}>Cookies</li>
          <li onClick={() => handleNavigate("/popsicle")}>Popsicles</li>
          <li onClick={() => handleNavigate("/premium")}>Premiums</li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
