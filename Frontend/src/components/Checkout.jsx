import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [area, setArea] = useState("near");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [receipt, setReceipt] = useState(null);

  const deliveryFee = area === "near" ? 100 : 200;
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = cartTotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Cart khali hai");
      return;
    }

    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all fields");
      return;
    }

    const data = new FormData();
    data.append("customer", JSON.stringify(form));
    data.append("items", JSON.stringify(cartItems));
    data.append("paymentMethod", paymentMethod);
    data.append("deliveryFee", deliveryFee);
    if (receipt && (paymentMethod === "jazzcash" || paymentMethod === "bank")) {
      data.append("receipt", receipt);
    }

    try {
      await axios.post("http://localhost:5000/api/orders", data);
      toast.success("Order placed successfully!");
      clearCart();
      setForm({ name: "", phone: "", address: "" });
      setReceipt(null);
    } catch (err) {
      toast.error("Order failed");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", background: "#fff", padding: 30, borderRadius: 10 }}>
      <h2 style={{ textAlign: "center" }}>🧾 Checkout</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
        <textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />

        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="near">Near (Rs. 100)</option>
          <option value="far">Far (Rs. 200)</option>
        </select>

        <div>
          <strong>Payment Method:</strong><br />
          <label><input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} /> Cash on Delivery</label><br />
          <label><input type="radio" name="payment" value="jazzcash" checked={paymentMethod === "jazzcash"} onChange={() => setPaymentMethod("jazzcash")} /> JazzCash</label><br />
          <label><input type="radio" name="payment" value="bank" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} /> Bank Transfer</label>
        </div>

        {(paymentMethod === "jazzcash" || paymentMethod === "bank") && (
          <input type="file" accept="image/*" onChange={(e) => setReceipt(e.target.files[0])} required />
        )}

        <button type="submit" style={{ background: "green", color: "#fff", padding: 12, borderRadius: 8 }}>
          Place Order (Total: Rs. {grandTotal})
        </button>
      </form>
    </div>
  );
};

export default Checkout;
