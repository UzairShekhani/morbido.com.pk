import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => {
        toast.error("Failed to load orders");
        console.error(err);
      });
  }, []);

  const markAsCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { status: "Completed" });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: "Completed" } : o));
      toast.success("Order marked as completed");
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <div style={{
      padding: "40px",
      fontFamily: "Segoe UI, sans-serif",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      color: "#000"  // Set default text to black
    }}>
      <h2 style={{
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "30px",
        color: "#000" // Heading in pure black
      }}>📦 All Orders</h2>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "flex-start",
      }}>
        {orders.map((order, index) => (
          <div key={index} style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            width: "320px",
            transition: "0.3s",
            color: "#000" // Ensures card text is black
          }}>
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "8px" }}>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </div>

            <div style={{ color: "#000", marginBottom: "10px" }}>
              <p><strong>👤</strong> {order.customer?.name}</p>
              <p><strong>📞</strong> {order.customer?.phone}</p>
              <p><strong>📍</strong> {order.customer?.address}</p>
              <p><strong>💳 Payment:</strong> {order.paymentMethod}</p>
              <p><strong>🚚 Delivery Fee:</strong> Rs. {order.deliveryFee}</p>
            </div>

            {order.receiptImage && (
              <img
                src={`http://localhost:5000/uploads/${order.receiptImage}`}
                alt="receipt"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  objectFit: "cover"
                }}
              />
            )}

            <ul style={{
              marginTop: "10px",
              paddingLeft: "18px",
              fontSize: "14px",
              color: "#000"
            }}>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} x{item.quantity} – Rs. {item.price}
                </li>
              ))}
            </ul>

            <p style={{
              marginTop: "12px",
              fontWeight: "bold",
              fontSize: "14px"
            }}>
              Status:{" "}
              <span style={{
                padding: "4px 8px",
                borderRadius: "6px",
                backgroundColor: order.status === "Completed" ? "#28a745" : "#ffc107",
                color: "#fff",
                fontSize: "12px"
              }}>
                {order.status || "Pending"}
              </span>
            </p>

            {order.status !== "Completed" && (
              <button
                onClick={() => markAsCompleted(order._id)}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "6px",
                  marginTop: "15px",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "background 0.3s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
              >
                ✅ Mark as Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersAdmin;
