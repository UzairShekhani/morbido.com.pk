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

      <h3
        style={{
          marginTop: "12px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {item.name}
      </h3>
      <p style={{ color: "#888", fontSize: "14px" }}>{item.category}</p>
      <p style={{ fontWeight: "bold", color: "#f15b5b", fontSize: "15px" }}>
        Rs. {item.price}
      </p>

      <button
        onClick={() => addToCart(item)}
        style={{
          marginTop: "12px",
          background: "linear-gradient(135deg,rgb(129, 129, 129),rgb(0, 0, 0))",
          color: "#fff",
          padding: "12px 18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "bold",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease-in-out",
          transform: "scale(1)",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
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
