// src/components/SliderMain.jsx
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SliderMain = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sliders/main")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("SliderMain fetch error:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides]);

  useEffect(() => {
    gsap.fromTo(
      ".page-wrapper",
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  const handleClick = (url) => {
    gsap.to(".page-wrapper", {
      duration: 1,
      x: -300,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => navigate(url),
    });
  };

  return (
    <div className="page-wrapper">
      <section className="slider-main">
        <div className="container">
          <div className="logo"></div>

          <div className="slider-content-wrap">
            <div className="slider-content">
              <h2 className="heading-style-2 fade-in">
                {slides[index]?.heading || "No Title"}
              </h2>
              <p className="fade-in">
                {slides[index]?.paragraph || "No Description"}
              </p>
            </div>
          </div>
        </div>

        <div className="slider-images">
          {slides.map((item, idx) => (
            <img
              key={idx}
              className={`slider-image ${
                index === idx ? "active" : "inactive"
              }`}
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.heading || `Slide ${idx + 1}`}
              onClick={() => handleClick(item.url || "/")}
            />
          ))}
        </div>

        <div id="backgrounds">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="background"
              style={{
                background: slide.bgColor || "radial-gradient(#F9F9EF, #ccc)",
                opacity: index === i ? 1 : 0,
              }}
            ></div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SliderMain;
