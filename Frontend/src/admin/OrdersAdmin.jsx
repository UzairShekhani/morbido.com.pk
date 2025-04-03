import { useEffect, useState } from "react";
import axios from "axios";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Order fetch error", err));
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>🧾 Orders</h2>
      {orders.map((order, idx) => (
        <div key={idx} style={{ padding: "20px", margin: "20px 0", background: "#f9f9f9", borderRadius: "8px" }}>
          <strong>Name:</strong> {order.name}<br />
          <strong>Phone:</strong> {order.phone}<br />
          <strong>Address:</strong> {order.address}<br />
          <strong>Total:</strong> Rs. {order.total}
          <ul style={{ marginTop: "10px" }}>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} x {item.quantity} = Rs. {item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrdersAdmin;
