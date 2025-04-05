import { useCart } from "../context/CartContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cartItems, removeOneFromCart } = useCart();
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

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
          background: "#ffe6e6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="mor-logo">
          <strong style={{ fontSize: "20px" }}>
            MORBIDO<sup>®</sup>
          </strong>
          <br />
          <small>Gelato Division</small>
        </div>

        <div
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setShowCart(true)}
        >
          <img
            style={{ width: "30px" }}
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
                padding: "3px 6px",
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

        <div style={{ flex: 1, overflowY: "auto" }}>
          {cartItems.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cartItems.map((item, idx) => (
                <li key={idx} style={{ display: "flex", gap: 10 }}>
                  <img
                    src={`http://localhost:5000/uploads/${item.image}`}
                    width="50"
                  />
                  <div style={{ flex: 1 }}>
                    <strong>{item.name}</strong>
                    {item.quantity > 1 && (
                      <span
                        style={{
                          marginLeft: 8,
                          color: "#f15b5b",
                          fontWeight: "bold",
                        }}
                      >
                        x{item.quantity}
                      </span>
                    )}
                    <br />
                    <small>Rs. {item.price}</small>
                  </div>
                  <button
                    onClick={() => removeOneFromCart(item._id)}
                    style={{
                      border: "none",
                      color: "#f44336",
                      background: "none",
                      fontSize: "16px",
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

        {/* Checkout Footer */}
        {cartItems.length > 0 && (
          <div style={{ paddingTop: "15px", borderTop: "1px solid #eee" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
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
                marginTop: "10px",
                backgroundColor: "#28a745",
                color: "#fff",
                width: "100%",
                padding: "10px",
                fontWeight: "600",
                fontSize: "15px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
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
