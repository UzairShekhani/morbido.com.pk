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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    data.append("location", location);

    await axios.post("http://localhost:5000/api/banners", data);
    toast.success("Banner uploaded");
    setImage(null);
    fetchBanners();
  };

  const deleteBanner = async (id) => {
    await axios.delete(`http://localhost:5000/api/banners/${id}`);
    fetchBanners();
    toast("Banner deleted");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2> Manage Banners</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ marginLeft: 10 }}>
          <option value="home">Homepage Banner</option>
          <option value="product">Product Page Banner</option>
        </select>
        <button type="submit" style={{ marginLeft: 10 }}>Upload</button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {banners.map((b) => (
          <div key={b._id} style={{ border: "1px solid #ddd", padding: 10 }}>
            <img src={`http://localhost:5000/uploads/${b.image}`} alt="banner" width="200" />
            <p>{b.location}</p>
            <button onClick={() => deleteBanner(b._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;
