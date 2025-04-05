import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    }
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
      const res = await axios.post("http://localhost:5000/api/products", formData);
      setProducts((prev) => [...prev, res.data]);
      toast.success("Product added!");
      setForm({ name: "", price: "", quantity: "", category: "", image: null });
    } catch (err) {
      toast.error("Submit Error");
      console.error("Submit Error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted!");
    } catch (err) {
      toast.error("Delete failed");
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 1000, margin: "auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>🍦 Manage Ice Cream Products</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{ flex: "1 1 200px", padding: 8 }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          style={{ flex: "1 1 100px", padding: 8 }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
          style={{ flex: "1 1 100px", padding: 8 }}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
          style={{ flex: "1 1 150px", padding: 8 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          style={{ flex: "1 1 180px" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 16px",
            fontWeight: "bold",
            fontSize: "14px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          ➕ Add Product
        </button>
      </form>

      <h3 style={{ marginBottom: 20 }}>🧁 All Products</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
            <div
            key={p._id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 15,
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
              transition: "transform 0.2s ease",
              textAlign: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {p.image && (
              <img
              src={`http://localhost:5000/uploads/${p.image}`}
              alt={p.name}
              style={{
                width: "47%",           // fills the card width
                height: "130px",         // fixed height for consistency
                objectFit: "cover",      // maintain aspect ratio + fill container
                borderRadius: 8,
                marginBottom: 10,
              }}
            />
            )}
            <h4 style={{ fontSize: "16px", margin: "5px 0" }}>{p.name}</h4>
            <p style={{ fontSize: "14px", margin: "4px 0", color: "black" }}>Rs. {p.price}</p>
            <p style={{ fontSize: "13px", color: "#555" }}>{p.quantity}L</p>
            <p style={{ fontSize: "12px", color: "#777", marginBottom: "10px" }}>{p.category}</p>

            <button
              onClick={() => handleDelete(p._id)}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: 6,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#b02a37")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
