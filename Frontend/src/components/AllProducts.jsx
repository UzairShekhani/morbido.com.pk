import { useEffect, useState } from "react";
import axios from "axios";
import BannerSection from "./BannerSection";
import IceCreamCard from "./IceCreamCard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Product fetch error:", err));
  }, []);

  return (
    <div style={{ paddingTop: "100px", backgroundColor: "#fafafa" }}>
      <BannerSection />

      <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "bold", textAlign: "center" , marginBottom: "20px", color: "#333" }}>
           All Ice Creams
        </h2>
        <br />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px",
        }}>
          {products.map((item) => (
            <IceCreamCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
