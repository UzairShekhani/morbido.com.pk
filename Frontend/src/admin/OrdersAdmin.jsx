import { useEffect, useState } from "react";
import axios from "axios";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Order fetch failed", err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>🧾 All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map((order, index) => (
            <li key={index} style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px"
            }}>
              <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} (x{item.quantity}) - Rs. {item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersAdmin;
