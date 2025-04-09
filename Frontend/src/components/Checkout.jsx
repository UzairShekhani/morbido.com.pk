import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [distance, setDistance] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [receipt, setReceipt] = useState(null);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const grandTotal = cartTotal + deliveryFee;

  useEffect(() => {
    const fetchDistance = async () => {
      if (!form.address) return;

      try {
        const res = await axios.post("http://localhost:5000/api/distance/calculate", {
          address: form.address,
        });

        const dist = res.data.distance / 1000; // meters to KM
        setDistance(dist);

        // 👇 Dynamic fee calculation
        if (dist <= 3) setDeliveryFee(100);
        else if (dist <= 7) setDeliveryFee(200);
        else setDeliveryFee(300);
      } catch (error) {
        console.error(error);
        toast.error("Failed to calculate delivery fee");
      }
    };

    fetchDistance();
  }, [form.address]);

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
      setDistance(null);
      setDeliveryFee(0);
    } catch (err) {
      console.error(err);
      toast.error("Order failed");
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "60px auto", padding: "20px" }}>
      <h2>Checkout</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Order Summary</h3>
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.name} × {item.quantity} = Rs. {item.price * item.quantity}
          </div>
        ))}
        <p>Subtotal: Rs. {cartTotal}</p>
        <p>Delivery Fee: Rs. {deliveryFee}</p>
        <p><strong>Grand Total: Rs. {grandTotal}</strong></p>
        {distance && <p>Distance: {distance.toFixed(2)} km</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <textarea placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />

        <div>
          <label>Payment Method:</label>
          {["cod", "jazzcash", "bank"].map((method) => (
            <label key={method} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                value={method}
                name="payment"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              {method}
            </label>
          ))}
        </div>

        {(paymentMethod === "jazzcash" || paymentMethod === "bank") && (
          <div>
            <label>Upload Payment Screenshot</label>
            <input type="file" accept="image/*" onChange={(e) => setReceipt(e.target.files[0])} />
          </div>
        )}

        <button type="submit">Place Order – Rs. {grandTotal}</button>
      </form>
    </div>
  );
};

export default Checkout;
