import { useEffect, useState } from "react";
import axios from "axios";

const HomeBanner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:5000/api/banners");
      const homeBanner = res.data.find(b => b.location === "home");
      setBanner(homeBanner);
    };
    fetch();
  }, []);

  if (!banner) return null;

  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      <img
        src={`http://localhost:5000/uploads/${banner.image}`}
        alt="Homepage Banner"
        style={{ width: "100%", height: "auto", borderRadius: "10px" }}
      />
    </div>
  );
};

export default HomeBanner;
