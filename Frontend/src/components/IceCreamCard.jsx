const IceCreamCard = ({ item }) => {
  return (
    <div
      style={{
        height: "92%",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
        padding: "21px",
        transition: "transform 0.3s",
        animation: "fadeSlideUp 0.6s ease",
      }}
    >
      <img
        src={`http://localhost:5000/uploads/${item.image}`}
        alt={item.name}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h3
        style={{
          marginTop: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {item.name}
      </h3>
      <p style={{ color: "#666", fontSize: "14px" }}>{item.category}</p>
      <p
        style={{
          fontWeight: "bold",
          color: "#f15b5b",
          marginTop: "5px",
        }}
      >
        Rs. {item.price}
      </p>

      {/* Inline CSS animation definitions */}
      <style>
        {`
          @keyframes fadeSlideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
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
