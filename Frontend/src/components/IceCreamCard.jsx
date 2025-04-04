import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const IceCreamCard = ({ item }) => {
  const { addToCart } = useCart();
  const [localQty, setLocalQty] = useState(item.quantity);

  const handleAddToCart = async () => {
    if (localQty > 0) {
      addToCart(item); // 🛒 add to cart
      setLocalQty((prev) => prev - 1); // 👇 quantity reduce on UI
    }

    // ✅ Optional: send to backend if you want real DB update (optional)
    // await axios.put(`http://localhost:5000/api/flavors/${item._id}`, {
    //   quantity: localQty - 1,
    // });
  };

  return (
    <div style={{
      padding: "20px",
      border: "1px solid #eee",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>
      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h3>{item.name}</h3>
      <p style={{ margin: "6px 0", fontWeight: "bold", color: "#f15b5b" }}>Rs. {item.price}</p>
      <p style={{ fontSize: "14px", color: "#444" }}>Available: {localQty}L</p>

      <button
        disabled={localQty <= 0}
        onClick={handleAddToCart}
        style={{
          padding: "10px 16px",
          backgroundColor: localQty <= 0 ? "#ccc" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          marginTop: "10px",
          cursor: localQty <= 0 ? "not-allowed" : "pointer",
        }}
      >
        {localQty <= 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default IceCreamCard;
