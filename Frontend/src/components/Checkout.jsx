import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) return toast.error("Please fill all fields.");
    if (cartItems.length === 0) return toast.error("Cart is empty!");

    try {
      await axios.post("http://localhost:5000/api/orders", {
        customer: form,
        items: cartItems,
      });
      toast.success("✅ Order placed!");
      clearCart();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "80px 20px" }}>
      <h2>Checkout</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
      <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <button onClick={handlePlaceOrder} style={{ marginTop: 10, background: "#28a745", color: "#fff", padding: "10px 20px", border: 0 }}>Place Order</button>
    </div>
  );
};

export default Checkout;
