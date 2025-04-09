import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("home");

  const fetchBanners = async () => {
    const res = await axios.get("http://localhost:5000/api/banners");
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const createBanner = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    data.append("location", location);

    await axios.post("http://localhost:5000/api/banners", data);
    toast.success("Banner added");
    setImage(null);
    fetchBanners();
  };

  const deleteBanner = async (id) => {
    await axios.delete(`http://localhost:5000/api/banners/${id}`);
    toast("Banner deleted");
    fetchBanners();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🖼️ Manage Banners</h2>
      <form onSubmit={createBanner} style={{ marginBottom: 20 }}>
        <select value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="home">Home</option>
          <option value="product">Product Page</option>
        </select>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {banners.map((b) => (
          <div key={b._id}>
            <img src={`http://localhost:5000/uploads/${b.image}`} width={180} style={{ borderRadius: 8 }} />
            <p>{b.location}</p>
            <button onClick={() => deleteBanner(b._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;
