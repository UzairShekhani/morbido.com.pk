import { useCart } from "../context/CartContext";

const IceCreamCard = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        padding: "18px",
        transition: "transform 0.3s",
        animation: "fadeSlideUp 0.6s ease",
        width: "100%",
        maxWidth: "260px",
        textAlign: "center",
        margin: "auto",
      }}
    >
      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.name}
        style={{
          width: "100%",
          height: "190px",
          objectFit: "cover",
          borderRadius: "10px",
        }}
      />

      <h3 style={{ marginTop: "12px", fontSize: "16px", fontWeight: "bold", color: "#333" }}>
        {item.name}
      </h3>
      <p style={{ color: "#888", fontSize: "14px" }}>{item.category}</p>
      <p style={{ fontWeight: "bold", color: "#f15b5b", fontSize: "15px" }}>Rs. {item.price}</p>

      <button
        onClick={() => addToCart(item)}
        style={{
          marginTop: "12px",
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Add to Cart
      </button>

      <style>
        {`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default IceCreamCard;
