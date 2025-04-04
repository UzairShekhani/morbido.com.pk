import { useEffect, useState } from "react";
import axios from "axios";

const FlavorAdmin = () => {
  const [flavors, setFlavors] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", image: null });

  const fetchFlavors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/flavors");
      setFlavors(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFlavors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const createFlavor = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("quantity", form.quantity);
    data.append("image", form.image);

    await axios.post("http://localhost:5000/api/flavors", data);
    fetchFlavors();
    setForm({ name: "", quantity: "", image: null });
  };

  const deleteFlavor = async (id) => {
    await axios.delete(`http://localhost:5000/api/flavors/${id}`);
    fetchFlavors();
  };

  const updateFlavorQty = async (id, qty) => {
    await axios.put(`http://localhost:5000/api/flavors/${id}`, { quantity: qty });
    fetchFlavors(); // Refresh list
  };

  return (
    <div>
      <h2>🍦 Manage Flavors</h2>
      <form onSubmit={createFlavor}>
        <input
          type="text"
          name="name"
          placeholder="Flavor Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (L)"
          value={form.quantity}
          onChange={handleChange}
        />
        <input type="file" onChange={handleFile} />
        <button type="submit">Add Flavor</button>
      </form>

      <hr />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {flavors.map((flavor) => (
          <div key={flavor._id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 15, width: 200 }}>
            <img
              src={`http://localhost:5000/uploads/${flavor.image}`}
              alt={flavor.name}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <h4>{flavor.name}</h4>
            <input
              type="number"
              value={flavor.quantity}
              onChange={(e) => updateFlavorQty(flavor._id, e.target.value)}
              style={{ width: "100%", marginTop: 5 }}
            />
            <button
              onClick={() => deleteFlavor(flavor._id)}
              style={{ backgroundColor: "#f44336", color: "#fff", marginTop: 10 }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorAdmin;
