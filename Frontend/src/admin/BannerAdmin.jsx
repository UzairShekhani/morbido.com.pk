import { useEffect, useState } from "react";
import axios from "axios";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    link: "",
    image: null,
  });

  const fetchBanners = async () => {
    const res = await axios.get("http://localhost:5000/api/banners");
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const createBanner = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("subtitle", form.subtitle);
    data.append("link", form.link);
    data.append("image", form.image);

    await axios.post("http://localhost:5000/api/banners", data);
    fetchBanners();
    setForm({ title: "", subtitle: "", link: "", image: null });
  };

  const deleteBanner = async (id) => {
    await axios.delete(`http://localhost:5000/api/banners/${id}`);
    fetchBanners();
  };

  return (
    <div>
      <h2>Manage Banners</h2>
      <form onSubmit={createBanner}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle" />
        <input name="link" value={form.link} onChange={handleChange} placeholder="Link" />
        <input type="file" onChange={handleFile} />
        <button type="submit">Add Banner</button>
      </form>

      <hr />

      <ul>
        {banners.map((b) => (
          <li key={b._id}>
            <h4>{b.title}</h4>
            <p>{b.subtitle}</p>
            <a href={b.link}>{b.link}</a>
            {b.image && (
              <img
                src={`http://localhost:5000/uploads/${b.image}`}
                alt={b.title}
                width="200"
              />
            )}
            <button onClick={() => deleteBanner(b._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BannerAdmin;
