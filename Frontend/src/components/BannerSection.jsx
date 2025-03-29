import { useEffect, useState } from "react";
import axios from "axios";

const BannerSection = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/banners")
      .then(res => {
        if (res.data && res.data.length > 0) {
          setBanner(res.data[res.data.length - 1]); // ✅ Show latest added banner
        }
      })
      .catch(err => console.error("Banner Fetch Error:", err));
  }, []);

  if (!banner || !banner.image) return null;

  return (
    <div style={{ width: "100%", height: "auto", marginTop: "60px" }}>
      <img
        src={`http://localhost:5000/uploads/${banner.image}`}
        alt="Banner"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: "10px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        }}
      />
    </div>
  );
};

export default BannerSection;
