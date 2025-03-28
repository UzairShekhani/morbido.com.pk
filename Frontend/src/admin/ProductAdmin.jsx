// src/admin/ManageProduct.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
      if (editingId) {
        const res = await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          formData
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === editingId ? res.data : p))
        );
        setEditingId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/products", formData);
        setProducts((prev) => [...prev, res.data]);
      }
      setForm({ name: "", price: "", quantity: "", category: "", image: null });
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      quantity: p.quantity,
      category: p.category,
      image: null,
    });
    setEditingId(p._id);
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Manage Products</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
        <button type="submit" style={{ backgroundColor: editingId ? "orange" : "green", color: "white", padding: 10, border: 0 }}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div style={{ marginTop: 30 }}>
        {products.map((p) => (
          <div key={p._id} style={{ background: "#f9f9f9", border: "1px solid #ccc", padding: 15, marginBottom: 15, borderRadius: 8 }}>
            <h4>{p.name}</h4>
            <p>Price: Rs. {p.price}</p>
            <p>Quantity: {p.quantity}</p>
            <p>Category: {p.category}</p>
            {p.image && (
              <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.name} height={80} style={{ marginBottom: 10, borderRadius: 5 }} />
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleEdit(p)} style={{ backgroundColor: "#007bff", color: "white", border: "none", padding: 8 }}>Edit</button>
              <button onClick={() => handleDelete(p._id)} style={{ backgroundColor: "#dc3545", color: "white", border: "none", padding: 8 }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
