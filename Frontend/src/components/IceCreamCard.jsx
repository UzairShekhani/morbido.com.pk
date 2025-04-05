import { useState } from "react";
import { useCart } from "../context/CartContext";

const IceCreamCard = ({ item }) => {
  const { addToCart, cartItems } = useCart(); // ✅ extract cartItems too
  const [localQty, setLocalQty] = useState(item.quantity);

  const handleAdd = () => {
    if (localQty > 0) {
      addToCart(item);
      setLocalQty((prev) => prev - 1);
    }
  };

  const cartQty = cartItems.find((ci) => ci._id === item._id)?.quantity || 0;
  const availableQty = item.quantity - cartQty;

  return (
    <div
      style={{
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "transform 0.3s ease",
      }}
    >
      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.name}
        style={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <h3>{item.name}</h3>
      <p style={{ fontWeight: "bold", color: "#f15b5b" }}>Rs. {item.price}</p>
      <p style={{ fontSize: "13px", color: "#666" }}>
        Available: {availableQty}L
      </p>
      <button
        onClick={handleAdd}
        disabled={availableQty <= 0}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          backgroundColor: availableQty <= 0 ? "#aaa" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: availableQty <= 0 ? "not-allowed" : "pointer",
        }}
      >
        {availableQty <= 0 ? "Out of Stock" : "Add to Cart"}
      </button>
    </div>
  );
};

export default IceCreamCard;
