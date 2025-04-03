import { useCart } from "../context/CartContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cartItems, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckout = () => {
    setShowCart(false);
    navigate("/checkout");
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <>
      {/* Top Navbar */}
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
          <span style={{ fontSize: "22px", fontWeight: "bold" }}>
            MORBIDO<sup>®</sup>
          </span>
          <br />
          <small style={{ fontSize: "12px" }}>Gelato Division</small>
        </div>

        {/* Cart Icon */}
        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setShowCart(true)}
        >
          <img
            style={{ width: "34px" }}
            src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
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

      {/* Cart Drawer */}
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
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Cart Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ margin: 0 }}>Cart Items</h3>
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

        {/* Cart List */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {cartItems.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cartItems.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "15px",
                    borderBottom: "1px solid #eee",
                    paddingBottom: "10px",
                  }}
                >
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: "15px", color: "#333" }}>
                      {item.name}
                    </strong>
                    {item.quantity > 1 && (
                      <span
                        style={{
                          backgroundColor: "#eee",
                          color: "#f44336",
                          fontWeight: "bold",
                          borderRadius: "12px",
                          fontSize: "12px",
                          marginLeft: "8px",
                          padding: "2px 6px",
                        }}
                      >
                        x{item.quantity}
                      </span>
                    )}
                    <br />
                    <span>Rs. {item.price}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "16px",
                      color: "#f44336",
                      cursor: "pointer",
                    }}
                  >
                    ✖
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: "#555" }}>Your cart is empty.</p>
          )}
        </div>

        {/* Checkout Bar */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: "15px 0 0",
              borderTop: "1px solid #eee",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              <span>Total</span>
              <span>Rs. {totalAmount}</span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                width: "100%",
                padding: "12px",
                fontWeight: "600",
                fontSize: "16px",
                borderRadius: "8px",
                cursor: "pointer",
                border: "none",
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
