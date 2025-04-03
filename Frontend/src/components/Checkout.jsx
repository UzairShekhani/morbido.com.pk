import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      return alert("Cart is empty!");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/orders", {
        customer: form,
        items: cartItems
      });
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Order Submit Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "100px 20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🧾 Checkout</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <button type="submit" style={{ padding: "10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "6px" }}>
          Place Order
        </button>
      </form>

      <h3 style={{ marginTop: "30px" }}>🛒 Cart Summary</h3>
      {cartItems.map((item, idx) => (
        <div key={idx} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
          <strong>{item.name}</strong> x {item.quantity} - Rs. {item.price * item.quantity}
        </div>
      ))}
    </div>
  );
};

export default Checkout;
