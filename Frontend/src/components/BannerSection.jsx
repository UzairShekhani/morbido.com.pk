// src/components/BannerSection.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const BannerSection = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/banners")
      .then(res => setBanner(res.data[0])) // assuming only 1 banner for now
      .catch(err => console.error("Banner fetch error", err));
  }, []);

  if (!banner) return null;

  return (
    <div className="w-full h-[300px] bg-cover bg-center" style={{ backgroundImage: `url(http://localhost:5000/uploads/${banner.image})` }}>
      <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold">{banner.heading}</h1>
      </div>
    </div>
  );
};

export default BannerSection;
