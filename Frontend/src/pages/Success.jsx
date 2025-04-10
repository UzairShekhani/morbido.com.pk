import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div style={{
      maxWidth: "600px",
      margin: "100px auto",
      textAlign: "center",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <h1 style={{ fontSize: "32px", color: "#28a745" }}>🎉 Thank You!</h1>
      <p style={{ fontSize: "18px", margin: "20px 0" }}>
        Your order has been successfully placed.
      </p>
      <Link to="/" style={{
        textDecoration: "none",
        padding: "12px 24px",
        background: "#E91E63",
        color: "#fff",
        borderRadius: "8px",
        fontWeight: "500",
      }}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default Success;
