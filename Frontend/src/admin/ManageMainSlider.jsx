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
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Manage Main Sliders</h2>

      <form 
        onSubmit={handleSubmit} 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Subtitle"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          required
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#28a745', color: 'white', cursor: 'pointer' }}>Add Slide</button>
      </form>

      {slides.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          {slides.map((s) => (
            <li key={s._id} style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '10px', marginBottom: '10px', backgroundColor: '#fff' }}>
              <b style={{ color: '#333' }}>{s.heading}</b> - {s.paragraph}
              <br />
              {s.image && (
                <img
                  src={`http://localhost:5000/uploads/${s.image}`}
                  height={80}
                  alt={s.heading}
                  style={{ display: 'block', marginTop: '10px', borderRadius: '5px' }}
                />
              )}
              <br />
              <button 
                onClick={() => handleDelete(s._id)}
                style={{ padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer', marginTop: '10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', color: '#777' }}>No slides found.</p>
      )}
    </div>
  );
};

export default ManageMainSlider;
