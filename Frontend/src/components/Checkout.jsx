// ✅ Final Updated: Checkout.jsx with Google Places Autocomplete + Distance API

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Autocomplete, LoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDbZjILZ_-8uNlUCyLvq4-ACFMDyKkw-z0"; // Replace with your actual key

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    area: "near",
    email: "",
  });
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [distanceKm, setDistanceKm] = useState(null);
  const [calculatingFee, setCalculatingFee] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [receipt, setReceipt] = useState(null);
  const [jazzcashNumber, setJazzcashNumber] = useState("");
  const [jazzcashCNIC, setJazzcashCNIC] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const autocompleteRef = useRef();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const grandTotal = cartTotal + deliveryFee;

  useEffect(() => {
    const fetchDistance = async () => {
      if (!form.address) return;
      setCalculatingFee(true);
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/distance/calculate",
          {
            address: form.address,
          }
        );
        const distanceKm = data.distance / 1000;
        setDistanceKm(distanceKm);
        const fee = Math.round(50 + distanceKm * 30);
        setDeliveryFee(fee);
      } catch (err) {
        console.error("Distance error:", err);
        toast.error("Failed to calculate delivery fee");
        setDeliveryFee(200);
      } finally {
        setCalculatingFee(false);
      }
    };
    fetchDistance();
  }, [form.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.error("Cart is empty");
    if (!form.name || !form.phone || !form.address || !form.email)
      return toast.error("All fields are required");
    if (
      paymentMethod === "jazzcash" &&
      (!jazzcashNumber || !jazzcashCNIC || !receipt)
    )
      return toast.error("Complete JazzCash info required");
    if (
      paymentMethod === "bank" &&
      (!cardNumber || !expiry || !cvv || !receipt)
    )
      return toast.error("Complete bank info required");

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

    const formData = new FormData();
    const customer = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      area: form.area,
      email: form.email,
      distance: distanceKm,
    };

    formData.append("customer", JSON.stringify(customer));
    formData.append("items", JSON.stringify(cartItems));
    formData.append("paymentMethod", paymentMethod);
    formData.append("deliveryFee", deliveryFee);
    if (receipt) formData.append("receipt", receipt);
    if (paymentMethod === "jazzcash") {
      formData.append("jazzcashNumber", jazzcashNumber);
      formData.append("jazzcashCNIC", jazzcashCNIC);
    }
    if (paymentMethod === "bank") {
      formData.append("cardNumber", cardNumber);
      formData.append("expiry", expiry);
      formData.append("cvv", cvv);
    }

    try {
      await axios.post("http://localhost:5000/api/orders", formData);
      Swal.fire("Success!", "Order placed successfully", "success");
      clearCart();
      
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    }
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🧾 Order Summary</h2>
        {cartItems.length > 0 ? (
          <div style={styles.summaryBox}>
            {cartItems.map((item) => (
              <div key={item._id} style={styles.summaryItem}>
                <span>{item.name}</span>
                <span>× {item.quantity}</span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
            ))}
            <hr />
            <div style={styles.summaryItem}>
              <strong>Subtotal:</strong>
              <span>Rs. {cartTotal}</span>
            </div>
            <div style={styles.summaryItem}>
              <strong>Delivery Fee:</strong>
              <span>
                Rs. {deliveryFee} {calculatingFee && "(calculating...)"}
              </span>
            </div>
            <div style={styles.summaryItem}>
              <strong>Total:</strong>
              <span style={{ color: "#E91E63" }}>Rs. {grandTotal}</span>
            </div>
          </div>
        ) : (
          <p style={styles.empty}>🛒 Cart is empty</p>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={styles.input}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={styles.input}
          />

          <Autocomplete
            onPlaceChanged={() => {
              const place = autocompleteRef.current.getPlace();
              if (place && place.formatted_address) {
                setForm((prev) => ({
                  ...prev,
                  address: place.formatted_address,
                }));
              } else {
                toast.error("Please select an address from the suggestions");
              }
            }}
            onLoad={(ref) => (autocompleteRef.current = ref)}
            options={{ componentRestrictions: { country: "pk" } }} // 👈 ADD THIS LINE
          >
            <input
              type="text"
              placeholder="Start typing your address..."
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              style={styles.input}
            />
          </Autocomplete>

          <div style={styles.radioGroup}>
            {["cod", "jazzcash", "bank"].map((method) => (
              <label key={method} style={styles.radioLabel}>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  style={styles.radioInput}
                />
                {method === "cod"
                  ? "Cash on Delivery"
                  : method === "jazzcash"
                  ? "JazzCash"
                  : "Bank Transfer"}
              </label>
            ))}
          </div>

          {paymentMethod === "jazzcash" && (
            <>
              <input
                type="text"
                placeholder="JazzCash Number"
                value={jazzcashNumber}
                onChange={(e) => setJazzcashNumber(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="CNIC (13 digits)"
                value={jazzcashCNIC}
                onChange={(e) => setJazzcashCNIC(e.target.value)}
                style={styles.input}
                required
              />
              <label style={styles.label}>Upload Receipt:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceipt(e.target.files[0])}
                style={styles.input}
              />
            </>
          )}

          {paymentMethod === "bank" && (
            <>
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                style={styles.input}
                required
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                  required
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  style={{ ...styles.input, flex: 1 }}
                  required
                />
              </div>
              <label style={styles.label}>Upload Receipt:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReceipt(e.target.files[0])}
                style={styles.input}
              />
            </>
          )}

          <button type="submit" style={styles.button}>
            Place Order – Rs. {grandTotal}
          </button>
        </form>
      </div>
    </LoadScript>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "40px auto",
    background: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "25px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    color: "#333",
  },
  summaryBox: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    margin: "5px 0",
    fontSize: "15px",
  },
  empty: {
    textAlign: "center",
    fontWeight: "500",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
  },
  label: {
    fontWeight: "500",
    marginBottom: "6px",
  },
  radioGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  radioLabel: {
    flex: "1",
    padding: "10px 12px",
    background: "#f0f0f0",
    borderRadius: "8px",
    fontWeight: "500",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  radioInput: {
    accentColor: "#E91E63",
    cursor: "pointer",
  },
  button: {
    padding: "14px",
    fontSize: "16px",
    fontWeight: "bold",
    background: "#E91E63",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Checkout;
