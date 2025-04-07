import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [payment, setPayment] = useState("COD");
  const [receipt, setReceipt] = useState(null);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = total < 1000 ? 100 : 0;
  const grandTotal = total + deliveryCharge;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      toast.error("All fields are required");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("phone", form.phone);
    data.append("address", form.address);
    data.append("paymentMethod", payment);
    data.append("items", JSON.stringify(cartItems));
    if (receipt) data.append("receipt", receipt);

    try {
      await axios.post("http://localhost:5000/api/orders", data);
      toast.success("🎉 Order placed!");
      clearCart();
      setForm({ name: "", phone: "", address: "" });
      setPayment("COD");
      setReceipt(null);
    } catch (err) {
      toast.error("Order failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "150px 20px 60px",
      background: "#f7f8fc",
      fontFamily: "'Segoe UI', sans-serif",
      gap: "30px",
    }}>
      {/* FORM */}
      <form onSubmit={handleSubmit} style={{
        flex: 1,
        maxWidth: "550px",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        animation: "fadeIn 0.5s ease-in-out"
      }}>
        <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>🧾 Checkout</h2>

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} style={input} />

        <label>Phone</label>
        <input name="phone" value={form.phone} onChange={handleChange} style={input} />

        <label>Address</label>
        <textarea name="address" value={form.address} onChange={handleChange} style={{ ...input, height: 80 }} />

        {/* PAYMENT METHOD */}
        <div style={{ marginTop: "20px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "10px" }}>Payment Method</label>

          <div style={radioGroup}>
            <label style={radioLabel}>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={payment === "COD"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label style={radioLabel}>
              <input
                type="radio"
                name="payment"
                value="BANK"
                checked={payment === "BANK"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Direct Bank Transfer
            </label>
          </div>
        </div>

        {/* BANK SECTION */}
        {payment === "BANK" && (
          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: "#eef6f6",
            borderRadius: "8px",
            border: "1px solid #cfecec"
          }}>
            <p><strong>Bank Name:</strong> Meezan Bank</p>
            <p><strong>Account Title:</strong> Morbido Gelato</p>
            <p><strong>Account No:</strong> 123456789</p>
            <p><strong>Branch Code:</strong> 0101</p>
            <label>Upload Receipt:</label>
            <input type="file" accept="image/*" onChange={(e) => setReceipt(e.target.files[0])} />
          </div>
        )}

        <button type="submit" style={submitBtn}>
          🚀 Place Order
        </button>
      </form>

      {/* ORDER SUMMARY */}
      <div style={{
        width: "340px",
        background: "#fff",
        borderRadius: "10px",
        padding: "25px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        animation: "slideIn 0.6s ease-in-out"
      }}>
        <h3 style={{ marginBottom: "15px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
          🧊 Order Summary
        </h3>

        {cartItems.map((item, index) => (
          <div key={index} style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            borderBottom: "1px solid #eee",
            paddingBottom: "10px"
          }}>
            <img
              src={`http://localhost:5000/uploads/${item.image}`}
              alt={item.name}
              style={{
                width: "60px",
                height: "70px",
                borderRadius: "6px",
                objectFit: "cover",
                marginRight: "12px"
              }}
            />
            <div>
              <div style={{ fontWeight: "bold" }}>{item.name}</div>
              <div style={{ fontSize: "14px", color: "#555" }}>
                x{item.quantity} – Rs. {item.price}
              </div>
            </div>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #eee", paddingTop: "10px", marginTop: "10px" }}>
          <div style={summaryRow}><span>Subtotal:</span><span>Rs. {total}</span></div>
          <div style={summaryRow}><span>Delivery:</span><span>Rs. {deliveryCharge}</span></div>
          <div style={{ ...summaryRow, fontWeight: "bold", fontSize: "16px", marginTop: "8px" }}>
            <span>Total:</span><span>Rs. {grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn { from {opacity: 0; transform: translateY(10px);} to {opacity: 1; transform: translateY(0);} }
        @keyframes slideIn { from {opacity: 0; transform: translateX(20px);} to {opacity: 1; transform: translateX(0);} }
      `}</style>
    </div>
  );
};

const input = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "15px",
  fontSize: "15px"
};

const submitBtn = {
  padding: "12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  marginTop: "20px",
  cursor: "pointer",
  fontSize: "16px"
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "15px",
  color: "#333",
  marginTop: "4px"
};

const radioGroup = {
  display: "flex",
  gap: "15px",
  marginBottom: "10px"
};

const radioLabel = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  color: "#444"
};

export default Checkout;

