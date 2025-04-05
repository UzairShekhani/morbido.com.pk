import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const FlavorAdmin = () => {
  const [flavors, setFlavors] = useState([]);
  const [form, setForm] = useState({ name: "", image: null });

  const fetchFlavors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/flavors");
      setFlavors(res.data);
    } catch (err) {
      toast.error("Failed to fetch flavors");
    }
  };

  useEffect(() => {
    fetchFlavors();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = (e) => setForm({ ...form, image: e.target.files[0] });

  const createFlavor = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("image", form.image);

    try {
      await axios.post("http://localhost:5000/api/flavors", data);
      toast.success("🍦 Flavor added!");
      setForm({ name: "", image: null });
      fetchFlavors();
    } catch {
      toast.error("❌ Error adding flavor");
    }
  };

  const deleteFlavor = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flavors/${id}`);
      toast.success(" Flavor deleted");
      fetchFlavors();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px" }}> Manage Flavors</h2>

      {/* Form */}
      <form
        onSubmit={createFlavor}
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <input
          name="name"
          placeholder="Flavor Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          required
          style={{
            flex: 1,
            padding: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ➕ Add Flavor
        </button>
      </form>

      {/* Flavors Display */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {flavors.map((flavor) => (
          <div
            key={flavor._id}
            style={{
              width: "220px",
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "15px",
              background: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${flavor.image}`}
              alt={flavor.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <h4 style={{ margin: "5px 0" }}>{flavor.name}</h4>
            <button
              onClick={() => deleteFlavor(flavor._id)}
              style={{
                background: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
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
