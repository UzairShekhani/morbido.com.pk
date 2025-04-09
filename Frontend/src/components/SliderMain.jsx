import { useEffect, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SliderMain = () => {
  const [slides, setSlides] = useState([]);
  const [banners, setBanners] = useState([]); // ✅ Banner state
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  // ✅ Fetch slider + banners
  useEffect(() => {
    axios.get("http://localhost:5000/api/sliders/main")
      .then((res) => setSlides(res.data))
      .catch((err) => console.error("SliderMain fetch error:", err));

    axios.get("http://localhost:5000/api/banners")
      .then((res) => {
        const homeBanners = res.data.filter(b => b.location === "home");
        setBanners(homeBanners);
      })
      .catch((err) => console.error("Banner fetch error:", err));
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
      {/* ✅ Banner Image (Top) */}
      {banners.length > 0 && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <img
            src={`http://localhost:5000/uploads/${banners[0].image}`}
            alt="Top Banner"
            style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* ✅ Main Slider */}
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
              className={`slider-image ${index === idx ? "active" : "inactive"}`}
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.heading || `Slide ${idx + 1}`}
              onClick={() => handleClick(item.url || "/")}
            />
          ))}
        </div>

        <div id="backgrounds">
          {slides.map((s, i) => (
            <div
              key={i}
              className="background"
              style={{
                background: s.bgColor || "#F9F9EF",
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
