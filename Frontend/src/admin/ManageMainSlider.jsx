// src/admin/ManageMainSlider.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

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
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSlides(res.data);
        } else {
          console.error('Invalid response:', res.data);
        }
      })
      .catch((err) => console.error('Fetch Error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("heading", form.title);
    formData.append("paragraph", form.subtitle);
    formData.append("image", form.image);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/sliders/main',
        formData
      );
      setSlides((prev) => [...prev, res.data]);
      setForm({ title: '', subtitle: '', image: null });
    } catch (err) {
      console.error('Submit Error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sliders/main/${id}`);
      setSlides((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2> Manage Main Sliders</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) =>
            setForm({ ...form, subtitle: e.target.value })
          }
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, image: e.target.files[0] })
          }
          required
        />
        <button type="submit">Add Slide</button>
      </form>

      {slides.length > 0 ? (
        <ul>
          {slides.map((s) => (
            <li key={s._id} style={{ marginBottom: '10px' }}>
              <b>{s.heading}</b> - {s.paragraph}
              <br />
              {s.image && (
                <img
                  src={`http://localhost:5000/uploads/${s.image}`}
                  height={80}
                  alt={s.heading}
                />
              )}
              <br />
              <button onClick={() => handleDelete(s._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No slides found.</p>
      )}
    </div>
  );
};

export default ManageMainSlider;
