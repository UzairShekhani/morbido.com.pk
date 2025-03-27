// src/admin.jsx
import { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("price", form.price);
    data.append("image", form.image);

    try {
      await axios.post("http://localhost:5000/api/flavors", data);
      alert("Flavor saved successfully!");
      setForm({ title: "", price: "", image: null });
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Failed to upload");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Add Ice Cream Flavor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <br />
        <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
        <br />
        <input type="file" name="image" onChange={handleFile} required />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Admin;
