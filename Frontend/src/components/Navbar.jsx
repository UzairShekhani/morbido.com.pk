import { useCart } from "../context/CartContext";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const { cartItems } = useCart();
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className="mor-navbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "linear-gradient(to right, #ffb6c1, #ffcba4)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="mor-logo">
          MORBIDO<sup>®</sup>
          <br />
          <small>Gelato Division</small>
        </div>

        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setShowCart(true)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
            width="26"
            alt="Cart"
          />
          {cartItems.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartItems.length}
            </span>
          )}
        </div>
      </header>

      {/* ✅ Cart Slider Drawer */}
      <div
        ref={cartRef}
        style={{
          position: "fixed",
          top: 0,
          right: showCart ? "0" : "-100%",
          width: "320px",
          height: "100%",
          background: "#fff",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.15)",
          zIndex: 9999,
          padding: "20px",
          transition: "right 0.4s ease",
        }}
      >
        {/* Close Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}> Cart Items</h3>
          <button
            onClick={() => setShowCart(false)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>

        <hr style={{ margin: "15px 0" }} />

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cartItems.map((item, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: "15px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: "14px", color: "#888" }}>
                  Rs. {item.price}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#666", fontSize: "14px" }}>Your cart is empty.</p>
        )}
      </div>
    </>
  );
};

export default Navbar;
