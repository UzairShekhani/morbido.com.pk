import BannerSection from "./BannerSection";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductPage = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        if (res.data.length > 0) {
          setProduct(res.data[0]);
          updateProgress(res.data[0].quantity || 0);
        }
      })
      .catch(err => console.error("Product Fetch Error:", err));
  }, []);

  const updateProgress = (quantity) => {
    const maxQuantity = 100;
    const percentage = (quantity / maxQuantity) * 100;
    const bar = document.getElementById("progress-bar");
    const text = document.getElementById("progress-text");

    if (bar && text) {
      bar.style.width = `${percentage}%`;
      text.innerText = `${quantity}L Available`;
    }
  };

  const optionStyle = {
    padding: "10px 16px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    display: "inline-block",
    margin: "5px 0"
  };

  const buttonBase = {
    padding: "14px 24px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.3s ease",
    minWidth: "120px"
  };

  if (!product) return <p style={{ textAlign: "center", marginTop: "150px" }}>Loading product...</p>;

  return (
    <div style={{ paddingTop: "120px" }}>
      <BannerSection />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          display: "flex",
          flexWrap: "wrap",
          padding: "0 20px",
          gap: "40px",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        {/* Image */}
        <div style={{ flex: "1 1 45%", textAlign: "center", animation: "fadeIn 1s ease" }}>
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            style={{
              width: "55%",
              borderRadius: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              transition: "transform 0.4s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* Details */}
        <div style={{ flex: "1 1 50%", animation: "slideUp 1s ease" }}>
          <h2
            style={{
              fontSize: "34px",
              color: "#222",
              marginBottom: "10px",
              fontWeight: 800,
            }}
          >
            {product.name}
          </h2>
          <p style={{ fontSize: "24px", fontWeight: "600", color: "#ff6b6b" }}>
            Rs. {product.price}
          </p>

          {/* Flavors */}
          <div style={{ marginTop: "24px" }}>
            <strong>Category:</strong>
            <div style={{ marginTop: "10px" }}>
              <span style={optionStyle}>{product.category}</span>
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginTop: "35px" }}>
            <label style={{ fontWeight: 500 }}>Available Quantity:</label>
            <div
              style={{
                height: "24px",
                background: "#eee",
                borderRadius: "12px",
                marginTop: "10px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                id="progress-bar"
                style={{
                  height: "100%",
                  width: "0%",
                  backgroundColor: "#28c76f",
                  transition: "width 0.6s ease",
                }}
              ></div>
              <span
                id="progress-text"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#333",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                0L Available
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: "35px", display: "flex", gap: "18px" }}>
            <button
              style={{
                ...buttonBase,
                backgroundColor: "#ffc107",
                color: "#fff",
                boxShadow: "0 5px 15px rgba(255,193,7,0.3)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
              onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
            >
              Buy Now
            </button>
            <button
              style={{
                ...buttonBase,
                backgroundColor: "#17a2b8",
                color: "#fff",
                boxShadow: "0 5px 15px rgba(23,162,184,0.3)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
              onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
