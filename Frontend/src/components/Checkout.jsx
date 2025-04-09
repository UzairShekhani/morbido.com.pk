import { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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

    if (cartItems.length === 0) return toast.error("Cart khali hai");
    if (!form.name || !form.phone || !form.address) return toast.error("Please fill all fields");
    if ((paymentMethod === "jazzcash" || paymentMethod === "bank") && !receipt)
      return toast.error("Payment screenshot required");

    const confirm = await Swal.fire({
      title: "Confirm Order?",
      text: `Total Amount: Rs. ${grandTotal}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, place it!",
    });

    if (!confirm.isConfirmed) return;

    const data = new FormData();
    data.append("customer", JSON.stringify(form));
    data.append("items", JSON.stringify(cartItems));
    data.append("paymentMethod", paymentMethod);
    data.append("deliveryFee", deliveryFee);
    if (receipt) data.append("receipt", receipt);

    try {
      await axios.post("http://localhost:5000/api/orders", data);
      Swal.fire("Success!", "Your order has been placed.", "success");
      clearCart();
      setForm({ name: "", phone: "", address: "" });
      setReceipt(null);
      setPaymentMethod("cod");
      setArea("near");
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    }
  };

  return (
    <div style={wrapperStyle}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />

      {/* 🧾 Order Summary */}
      <div style={cardStyle}>
        <h2 style={titleStyle}> Order Summary</h2>
        {cartItems.length > 0 ? (
          <>
            <ul style={{ marginBottom: 10 }}>
              {cartItems.map((item) => (
                <li key={item.id} style={listItemStyle}>
                  {item.name} × {item.quantity} = Rs. {item.price * item.quantity}
                </li>
              ))}
            </ul>
            <p style={{color:"black" }}>Subtotal: Rs. {cartTotal}</p>
            <p style={{color:"black"}}>Delivery Fee: Rs. {deliveryFee}</p>
            <p style={{color:"black"}}>Total: Rs. {grandTotal}</p>
          </>
        ) : (
          <p style={{ textAlign: "center", fontWeight: 500 }}>Cart is empty</p>
        )}
      </div>

      {/* 📦 Form + Map */}
      <div style={cardStyle}>
        <h2 style={titleStyle}> Shipping & Payment</h2>
        <div style={formMapWrapper}>
          {/* LEFT: FORM */}
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={twoColumn}>
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={inputStyle}
              />
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <textarea
              placeholder="Delivery Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />

            <div>
              <label style={labelStyle}>Delivery Area</label>
              <select value={area} onChange={(e) => setArea(e.target.value)} style={inputStyle}>
                <option value="near">Near (Rs. 100)</option>
                <option value="far">Far (Rs. 200)</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Payment Method</label>
              {["cod", "jazzcash", "bank"].map((method) => (
                <label key={method} style={radioStyle}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    style={{ marginRight: 8 }}
                  />
                  {method === "cod" ? "Cash on Delivery" : method === "jazzcash" ? "JazzCash" : "Bank Transfer"}
                </label>
              ))}
            </div>

            {(paymentMethod === "jazzcash" || paymentMethod === "bank") && (
              <div>
                <label style={labelStyle}>Upload Payment Screenshot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setReceipt(e.target.files[0])}
                  style={fileInputStyle}
                />
              </div>
            )}

            <button type="submit" style={buttonStyle}>
              Confirm Order – Rs. {grandTotal}
            </button>
          </form>

          {/* RIGHT: MAP */}
          <div style={mapBoxStyle}>
            <iframe
              title="Delivery Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.3974292041985!2d67.0579537149963!3d24.847628984056585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f8b2f8f07a7%3A0xb02fdfc7c5b0dd10!2sHappy%20Palace%20Group%20of%20Schools!5e0!3m2!1sen!2s!4v1684156825790!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "12px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ✨ Styling
const wrapperStyle = {
  maxWidth: "1000px",
  margin: "60px auto",
  padding: "20px",
  fontFamily: "'Poppins', sans-serif",
};

const cardStyle = {
  background: "#fff",
  borderRadius: "16px",
  padding: "30px",
  marginBottom: "30px",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: 600,
  borderBottom: "1px solid #eee",
  paddingBottom: "12px",
  marginBottom: "24px",
};

const inputStyle = {
  padding: "12px",
  fontSize: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  marginBottom: "12px",
  width: "100%",
};

const fileInputStyle = {
  ...inputStyle,
  border: "1px dashed #aaa",
  backgroundColor: "#f9f9f9",
};

const radioStyle = {
  display: "block",
  marginBottom: "10px",
};

const labelStyle = {
  display: "block",
  fontWeight: 500,
  marginBottom: "6px",
};

const totalRow = {
  fontSize: "15px",
  marginBottom: "5px",
};

const grandTotalStyle = {
  fontWeight: 600,
  fontSize: "16px",
  color: "#007bff",
  marginTop: "10px",
};

const listItemStyle = {
  fontSize: "14px",
  marginBottom: "5px",
  color: "#444",
};

const buttonStyle = {
  background: "#007bff",
  color: "#fff",
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  fontSize: "16px",
  fontWeight: 500,
  cursor: "pointer",
};

const formMapWrapper = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const formStyle = {
  flex: "1 1 420px",
  display: "flex",
  flexDirection: "column",
};

const mapBoxStyle = {
  flex: "1 1 420px",
  height: "380px",
  minWidth: "300px",
};

const twoColumn = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

export default Checkout;
