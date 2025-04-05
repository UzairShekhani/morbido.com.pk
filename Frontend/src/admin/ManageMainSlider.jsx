import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageMainSlider = () => {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    image: null,
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/sliders/main')
      .then((res) => setSlides(res.data))
      .catch((err) => toast.error("Failed to fetch slides"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", form.title);
    formData.append("paragraph", form.subtitle);
    formData.append("image", form.image);

    try {
      const res = await axios.post('http://localhost:5000/api/sliders/main', formData);
      setSlides((prev) => [...prev, res.data]);
      setForm({ title: '', subtitle: '', image: null });
      toast.success("Slide added!");
    } catch (err) {
      toast.error("Failed to add slide");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sliders/main/${id}`);
      setSlides((prev) => prev.filter((s) => s._id !== id));
      toast.success("Slide deleted!");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '800px',
      margin: 'auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>🎞️ Manage Main Sliders</h2>

      {/* 👇 Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          required
          style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }}
        />
        {/* 🔥 Custom File Button */}
        <label style={{
          background: "#6c63ff",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          textAlign: "center",
          width: "fit-content"
        }}>
          📁 Choose Slide Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            required
            style={{ display: 'none' }}
          />
        </label>

        <button type="submit" style={{
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px",
          borderRadius: "6px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer"
        }}>
          ➕ Add Slide
        </button>
      </form>

      {/* 👇 Slide List */}
      {slides.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {slides.map((s) => (
            <div key={s._id} style={{
              flex: "1 1 240px",
              background: "#f8f9fa",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 1px 5px rgba(0,0,0,0.06)"
            }}>
              <h4 style={{ marginBottom: "8px" }}>{s.heading}</h4>
              <p style={{ color: "#777", fontSize: "14px" }}>{s.paragraph}</p>
              {s.image && (
                <img
                  src={`http://localhost:5000/uploads/${s.image}`}
                  alt={s.heading}
                  style={{ width: "100%", borderRadius: "6px", marginTop: "10px" }}
                />
              )}
              <button onClick={() => handleDelete(s._id)} style={{
                marginTop: "12px",
                padding: "8px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                width: "100%",
                cursor: "pointer",
                fontWeight: "bold"
              }}>
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: "#888" }}>No slides added yet.</p>
      )}
    </div>
  );
};

export default ManageMainSlider;
