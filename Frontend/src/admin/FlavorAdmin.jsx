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

  const updateFlavorQty = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/flavors/${id}`, { quantity });
      fetchFlavors();
    } catch (err) {
      console.error("Quantity update failed:", err);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
      <h2>🍦 Manage Flavors</h2>

      <form onSubmit={createFlavor} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          name="name"
          placeholder="Flavor Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity (L)"
          value={form.quantity}
          onChange={handleChange}
          required
          style={{ marginRight: "10px", padding: "8px", width: "120px" }}
        />
        <input type="file" onChange={handleFile} style={{ marginRight: "10px" }} />
        <button type="submit" style={{ padding: "8px 16px" }}>Add Flavor</button>
      </form>

      <hr />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px" }}>
        {flavors.map((flavor) => (
          <div key={flavor._id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px" }}>
            <img
              src={`http://localhost:5000/uploads/${flavor.image}`}
              alt={flavor.name}
              width="100%"
              height="140px"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
            <h4 style={{ margin: "10px 0 5px" }}>{flavor.name}</h4>
            <p style={{ margin: "5px 0" }}><strong>Quantity:</strong></p>
            <input
              type="number"
              value={flavor.quantity}
              onChange={(e) => updateFlavorQty(flavor._id, e.target.value)}
              style={{
                width: "100%",
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                marginBottom: "10px"
              }}
            />
            <button
              onClick={() => deleteFlavor(flavor._id)}
              style={{
                padding: "6px 12px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
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
