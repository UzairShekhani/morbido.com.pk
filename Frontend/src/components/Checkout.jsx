import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) return alert("Please fill all fields.");
    if (cartItems.length === 0) return alert("Cart is empty!");

    try {
      await axios.post("http://localhost:5000/api/orders", {
        customer: form,
        items: cartItems,
      });

      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <div style={{ padding: "80px 20px" }}>
      <h2>Checkout</h2>

      {success ? (
        <div style={{ marginTop: "30px", fontWeight: "bold", color: "green" }}>
          ✅ Order placed successfully!
        </div>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            <input
              name="name"
              placeholder="Your Name"
              onChange={handleChange}
              value={form.name}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              value={form.phone}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />
            <textarea
              name="address"
              placeholder="Address"
              onChange={handleChange}
              value={form.address}
              style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
