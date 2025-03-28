import { useEffect, useState } from "react";
import axios from "axios";
import IceCreamCard from "./IceCreamCard";
import "./IceCreamGrid.css"; // optional styling
import BannerSection from "./BannerSection";

const IceCreamGrid = () => {
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/flavors") // update this path if needed
      .then((res) => setFlavors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <BannerSection/>
    <div className="icecream-grid">
      {flavors.map((item) => (
        <IceCreamCard
          key={item._id}
          image={item.image}
          name={item.name}
          price={item.price}
          onClick={() => console.log("Clicked:", item.name)}
        />
      ))}
    </div>
    </>
  );
};

export default IceCreamGrid;
