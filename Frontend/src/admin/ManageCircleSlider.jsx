// src/admin/ManageCircleSlider.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCircleSlider = () => {
  const [flavors, setFlavors] = useState([]);
  const [form, setForm] = useState({ flavor: '', price: '', image: null });

  useEffect(() => {
    axios.get('http://localhost:5000/api/sliders/circle')
      .then(res => {
        if (Array.isArray(res.data)) {
          setFlavors(res.data);
        } else {
          console.error('Invalid response:', res.data);
        }
      })
      .catch(err => console.error('Fetch Error:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    try {
      const res = await axios.post('http://localhost:5000/api/sliders/circle', formData);
      setFlavors(prev => [...prev, res.data]);
      setForm({ flavor: '', price: '', image: null });
    } catch (err) {
      console.error('Submit Error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sliders/circle/${id}`);
      setFlavors(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      console.error('Delete Error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '15px' }}> Manage Circle Sliders</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Flavor Name"
          value={form.flavor}
          onChange={(e) => setForm({ ...form, flavor: e.target.value })}
          required
          style={{ padding: '8px', flex: '1' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          style={{ padding: '8px', width: '120px' }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          required
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#3B82F6', color: 'white', border: 'none' }}>
          Add Flavor
        </button>
      </form>

      {form.image && (
        <img
          src={URL.createObjectURL(form.image)}
          height="80"
          style={{ marginBottom: '20px', borderRadius: '8px' }}
          alt="Preview"
        />
      )}

      {flavors.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {flavors.map((f) => (
            <div key={f._id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <b>{f.flavor}</b>
              <p>Rs. {f.price}</p>
              <img
                src={`http://localhost:5000/uploads/${f.image}`}
                height={80}
                alt={f.flavor}
                style={{ borderRadius: '8px' }}
              />
              <br />
              <button
                onClick={() => handleDelete(f._id)}
                style={{ marginTop: '10px', padding: '6px 12px', backgroundColor: '#EF4444', color: 'white', border: 'none' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No flavors found.</p>
      )}
    </div>
  );
};

export default ManageCircleSlider;
