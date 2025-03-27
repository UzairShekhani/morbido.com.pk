// src/components/CircleSlider.jsx
import { useEffect, useState } from "react";
import gsap from "gsap";
import "../styles/App.css";
import axios from "axios";

const CircleSlider = () => {
  const [flavors, setFlavors] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sliders/circle")
      .then((res) => setFlavors(res.data))
      .catch((err) => console.error("CircleSlider fetch error:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % flavors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [flavors]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + flavors.length) % flavors.length);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % flavors.length);
  };

  useEffect(() => {
    gsap.fromTo(
      ".slider2",
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section className="page-wrapper">
      <div
        className="slider2"
        style={{
          position: "relative",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="list"
          style={{ display: "flex", justifyContent: "center" }}
        >
          {flavors.map((f, idx) => (
            <div
              key={idx}
              className={`item ${active === idx ? "active" : ""}`}
              style={{ margin: "0 10px" }}
            >
              <img
                src={`http://localhost:5000/uploads/${f.image}`}
                alt={f.flavor}
                style={{ height: "220px", borderRadius: "16px" }}
              />
            </div>
          ))}
        </div>

        <div
          className="circle"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            fontWeight: "bold",
            margin: "20px 0",
          }}
        >
          {flavors[active]?.flavor?.split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </div>

        <div className="content" style={{ textAlign: "center" }}>
          <h3 style={{ marginBottom: "10px" }}>🍦 {flavors[active]?.flavor}</h3>
          <p style={{ fontSize: "18px", marginBottom: "8px" }}>
            Price: Rs. {flavors[active]?.price}
          </p>
          <button
            style={{
              padding: "8px 20px",
              backgroundColor: "#FF8C00",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            See More
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            id="prev"
            onClick={handlePrev}
            style={{ marginRight: "10px", fontSize: "24px" }}
          >
            ❮
          </button>
          <button
            id="next"
            onClick={handleNext}
            style={{ fontSize: "24px" }}
          >
            ❯
          </button>
        </div>
      </div>
    </section>
  );
};

export default CircleSlider;
