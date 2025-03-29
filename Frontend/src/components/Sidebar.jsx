import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
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
        {/* Hamburger Bars */}
        <div
          className={`mor-toggle-btn ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <div className="mor-bar"></div>
          <div className="mor-bar"></div>
          <div className="mor-bar"></div>
        </div>

        {/* Cart Icon */}
        <div className="mor-cart-icon" onClick={() => alert("Cart clicked!")}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            width="26"
            alt="Cart"
          />
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`mor-sidebar ${open ? "open" : ""}`}>
        {/* <h2>Flavors</h2> */}
        <br />
        <br />
        <br />
        <ul>
          <li onClick={() => handleNavigate("/all-products")}>All Products</li>

          <li onClick={() => handleNavigate("/")}> Home</li>
          <li onClick={() => handleNavigate("/fudge-bar")}> Chocolate Fudge</li>
          <li onClick={() => handleNavigate("/chocolate-delight")}>
            {" "}
            Delights
          </li>
          <li onClick={() => handleNavigate("/cookie-details")}> Cookies</li>
          <li onClick={() => handleNavigate("/popsicle")}> Popsicles</li>
          <li onClick={() => handleNavigate("/premium")}> Premiums</li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
