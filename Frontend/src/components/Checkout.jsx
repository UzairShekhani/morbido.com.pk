import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", area: "near" });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [receipt, setReceipt] = useState(null);

  const deliveryFee = form.area === "near" ? 100 : 250;
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + deliveryFee;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) return toast.error("Fill all fields!");
    if (paymentMethod === "bank" && !receipt) return toast.error("Upload receipt!");

    try {
      const data = new FormData();
      data.append("customer", JSON.stringify(form));
      data.append("items", JSON.stringify(cartItems));
      data.append("paymentMethod", paymentMethod);
      data.append("deliveryFee", deliveryFee);
      if (receipt) data.append("receipt", receipt);

      await axios.post("http://localhost:5000/api/orders", data);
      toast.success("Order placed!");
      clearCart();
      setForm({ name: "", phone: "", address: "", area: "near" });
      setPaymentMethod("cod");
      setReceipt(null);
    } catch (err) {
      toast.error("Order failed");
    }
  };

  return (
    <div style={{ padding: "120px 20px", maxWidth: "900px", margin: "auto", display: "flex", gap: "30px" }}>
      <form onSubmit={handleSubmit} style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 10 }}>
        <h2>Checkout</h2>

        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} style={input} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} style={input} required />
        <textarea name="address" placeholder="Address" onChange={handleChange} value={form.address} style={input} required />

        <label>Delivery Area:</label>
        <select name="area" value={form.area} onChange={handleChange} style={input}>
          <option value="near">Near (Rs. 100)</option>
          <option value="far">Far (Rs. 250)</option>
        </select>

        <label>Payment Method:</label>
        <div style={{ display: "flex", gap: "20px", marginBottom: 10 }}>
          <label>
            <input type="radio" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} /> Cash on Delivery
          </label>
          <label>
            <input type="radio" value="jazzcash" checked={paymentMethod === "jazzcash"} onChange={(e) => setPaymentMethod(e.target.value)} /> JazzCash
          </label>
          <label>
            <input type="radio" value="bank" checked={paymentMethod === "bank"} onChange={(e) => setPaymentMethod(e.target.value)} /> Bank Transfer
          </label>
        </div>

        {paymentMethod === "jazzcash" && (
          <div style={{ background: "#fef4e8", padding: "10px", borderRadius: "5px", marginBottom: 10 }}>
            JazzCash Number: <strong>0300-XXXXXXX</strong><br />
            Enter transaction ID in notes (optional)
          </div>
        )}

        {paymentMethod === "bank" && (
          <div style={{ background: "#e8f7ff", padding: "10px", borderRadius: "5px", marginBottom: 10 }}>
            <p>Bank: Meezan Bank</p>
            <p>Account Title: Morbido Ice Cream</p>
            <p>Account Number: 123456789012</p>
            <input type="file" onChange={(e) => setReceipt(e.target.files[0])} style={input} required />
          </div>
        )}

        <button type="submit" style={{ padding: "12px", background: "#28a745", color: "#fff", borderRadius: 8, border: "none" }}>
          Place Order (Total: Rs. {total})
        </button>
      </form>
    </div>
  );
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default Checkout;
