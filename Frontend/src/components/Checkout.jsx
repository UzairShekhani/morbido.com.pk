import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "0", // we don't show map, just use autocomplete
};

const center = {
  lat: 24.8607,
  lng: 67.0011,
};

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setForm({ ...form, address: place.formatted_address });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/orders", {
        customer: form,
        items: cartItems,
      });
      toast.success("Order placed successfully! 🚀");
      clearCart();
      setForm({ name: "", phone: "", address: "" });
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: "auto" }}>
      <h2 style={{ marginBottom: 20 }}>🍨 Checkout</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 15,
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
          style={{
            padding: 10,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY" libraries={["places"]}>
          <Autocomplete
            onLoad={(auto) => setAutocomplete(auto)}
            onPlaceChanged={handlePlaceSelect}
          >
            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
              style={{
                padding: 10,
                borderRadius: 6,
                border: "1px solid #ccc",
              }}
            />
          </Autocomplete>
        </LoadScript>

        <div
          style={{
            marginTop: 10,
            background: "#f8f8f8",
            padding: 15,
            borderRadius: 8,
            border: "1px solid #eee",
          }}
        >
          <strong>Total:</strong> Rs.{" "}
          {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        </div>

        <button
          type="submit"
          style={{
            padding: 12,
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🛍️ Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
