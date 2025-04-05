import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Order fetch failed", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, {
        status: "Completed",
      });
      toast.success("Order marked as Completed");
      fetchOrders(); // refresh
    } catch (err) {
      console.error("Failed to update order status", err);
      toast.error("Failed to update order status");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Segoe UI', sans-serif",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          color: "#333",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        🧾 All Customer Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No orders found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {orders.map((order, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div style={{ marginBottom: "12px", color: "#888" }}>
                📅 <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <div style={{ marginBottom: "15px" }}>
                <strong style={{ color: "#222" }}>
                  👤 {order.customer?.name}
                </strong>
                <div style={{ fontSize: "14px", color: "#555" }}>
                  📞 {order.customer?.phone}
                  <br />
                  📍 {order.customer?.address}
                </div>
              </div>

              <div style={{ marginBottom: "10px" }}>
                🧊 <strong>Items:</strong>
                <ul
                  style={{
                    listStyleType: "disc",
                    marginTop: "10px",
                    marginLeft: "20px",
                  }}
                >
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        marginBottom: "6px",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      {item.name} x{item.quantity} –{" "}
                      <span style={{ fontWeight: "bold", color: "#f15b5b" }}>
                        Rs. {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: "10px" }}>
                <strong>Status: </strong>
                <span
                  style={{
                    color: order.status === "Completed" ? "#28a745" : "#ff9800",
                    fontWeight: "bold",
                  }}
                >
                  {order.status}
                </span>
              </div>

              {order.status !== "Completed" && (
                <button
                  onClick={() => markCompleted(order._id)}
                  style={{
                    marginTop: "15px",
                    padding: "10px 15px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersAdmin;
