import { useEffect, useState } from "react";
import axios from "axios";
import IceCreamCard from "./IceCreamCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productRes, bannerRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products"),
        axios.get("http://localhost:5000/api/banners"),
      ]);
      setProducts(productRes.data);
      setBanner(bannerRes.data[0]); // use first banner
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setTimeout(() => setLoading(false), 1000); // smooth UX
    }
  };

  return (
    <div style={{ paddingTop: "100px", padding: "30px", background: "#fcfcfc" }}>
      <br /> <br /><br /><br /><br /><br />
      {/* 🔥 Banner */}
      {banner && (
        <img
          src={`http://localhost:5000/uploads/${banner.image}`}
          alt="Banner"
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "30px",
            opacity: loading ? 0 : 1,
            transition: "opacity 0.8s ease-in-out"
          }}
        />
      )}

      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🍨 All Ice Creams</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {loading
          ? Array(6).fill().map((_, i) => (
              <div key={i} style={{
                background: "#eee",
                borderRadius: "10px",
                height: "300px",
                animation: "pulse 1s infinite",
              }} />
            ))
          : products.map((product) => (
              <IceCreamCard key={product._id} item={product} />
            ))}
      </div>
    </div>
  );
};

export default AllProducts;
