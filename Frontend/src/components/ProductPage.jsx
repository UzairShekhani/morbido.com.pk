import BannerSection from "./BannerSection";
import { useEffect } from "react";

const ProductPage = () => {
  useEffect(() => {
    updateProgress(70); // Example value
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

  const flavorOptions = ["Chocolate", "Vanilla", "Strawberry", "Mango"];
  const sizeOptions = ["Small", "Medium", "Large"];

  const optionStyle = {
    padding: "8px 14px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "14px",
  };

  const buttonBase = {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  return (
    <>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    
      <BannerSection />
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          display: "flex",
          flexWrap: "wrap",
          padding: "0 20px",
          gap: "30px",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        {/* Image */}
        <div style={{ flex: "1 1 45%", textAlign: "center" }}>
          <img
            src="/images/11.jpg"
            alt="Ice Cream"
            style={{
              width: "100%",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              transition: "transform 0.4s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* Details */}
        <div style={{ flex: "1 1 50%" }}>
          <h2
            style={{
              fontSize: "30px",
              color: "#222",
              marginBottom: "5px",
              fontWeight: 700,
            }}
          >
            🍧 Delicious Ice Cream
          </h2>
          <p style={{ fontSize: "22px", fontWeight: "600", color: "#f37272" }}>Rs. 299</p>

          {/* Flavors */}
          <div style={{ marginTop: "20px" }}>
            <strong>Flavors:</strong>
            <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {flavorOptions.map((f, i) => (
                <span
                  key={i}
                  style={optionStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#fef4ef")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div style={{ marginTop: "20px" }}>
            <strong>Sizes:</strong>
            <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {sizeOptions.map((s, i) => (
                <span
                  key={i}
                  style={optionStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f0f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div style={{ marginTop: "30px" }}>
            <label style={{ fontWeight: 500 }}>Available Quantity:</label>
            <div
              style={{
                height: "20px",
                background: "#eee",
                borderRadius: "10px",
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
                  backgroundColor: "#86d19c",
                  transition: "width 0.5s ease",
                }}
              ></div>
              <span
                id="progress-text"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#444",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                0L Available
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: "30px", display: "flex", gap: "15px" }}>
            <button
              style={{
                ...buttonBase,
                backgroundColor: "#ffc107",
                color: "#fff",
                boxShadow: "0 4px 10px rgba(255,193,7,0.2)",
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
                boxShadow: "0 4px 10px rgba(23,162,184,0.2)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = 0.9)}
              onMouseOut={(e) => (e.currentTarget.style.opacity = 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
