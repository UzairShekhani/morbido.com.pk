import { useEffect, useState } from "react";
import axios from "axios";

const FlavorsPage = () => {
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/flavors")
      .then(res => setFlavors(res.data))
      .catch(err => console.error("Flavor fetch error:", err));
  }, []);

  return (
    <div style={{ paddingTop: "100px", padding: "20px" }}>
        <br /><br /><br /><br /><br /><br /><br /><br />
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}> Our Flavors</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {flavors.map((flavor, index) => (
          <div
            key={flavor._id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              overflow: "hidden",
              textAlign: "center",
              animation: `fadeSlideUp 0.6s ease ${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${flavor.image}`}
              alt={flavor.name}
              style={{
                width: "73%",
                height: "203px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333" }}>
                {flavor.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Inline animation styles */}
      <style>
        {`
          @keyframes fadeSlideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default FlavorsPage;
