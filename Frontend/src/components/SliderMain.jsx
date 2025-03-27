// src/components/SliderMain.jsx
import { useEffect, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SliderMain = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // Fetch from DB
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/sliders/main")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("SliderMain fetch error:", err));
  }, []);

  // Auto slide change every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides]);

  // Page entry animation
  useEffect(() => {
    gsap.fromTo(
      ".page-wrapper",
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  }, []);

  // On image click navigate with exit animation
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
              <h2 className="heading-style-2">{slides[index]?.heading}</h2>
              <p>{slides[index]?.paragraph}</p>
            </div>
          </div>
        </div>

        <div className="slider-images">
          {slides.map((item, idx) => (
            <img
              key={idx}
              className={`slider-image ${index === idx ? "active" : ""}`}
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.heading}
              onClick={() => handleClick(item.url)}
            />
          ))}
        </div>

        <div id="backgrounds">
          {slides.map((_, i) => (
            <div
              key={i}
              className="background"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, #F9F9EF 0%, #ccc 100%)",
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
