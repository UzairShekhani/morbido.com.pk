import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banners");
      setBanners(res.data);
    } catch (err) {
      toast.error("Failed to load banners");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const createBanner = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please select an image.");

    try {
      const data = new FormData();
      data.append("image", image);

      await axios.post("http://localhost:5000/api/banners", data);
      toast.success("Banner uploaded!");
      setImage(null);
      fetchBanners();
    } catch (err) {
      toast.error("Upload failed!");
    }
  };

  const deleteBanner = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/banners/${id}`);
      toast.success("Banner deleted!");
      fetchBanners();
    } catch (err) {
      toast.error("Failed to delete banner.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "20px" }}> Manage Banners</h2>

      <form
        onSubmit={createBanner}
        style={{
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <label
          htmlFor="bannerImage"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
           Choose Image
        </label>
        <input
          id="bannerImage"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Upload Banner
        </button>
      </form>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {banners.map((banner) => (
          <div
            key={banner._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "8px",
              width: "220px",
              textAlign: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={`http://localhost:5000/uploads/${banner.image}`}
              alt="Banner"
              style={{
                width: "100%",
                borderRadius: "6px",
                marginBottom: "10px",
                objectFit: "cover",
                height: "120px",
              }}
            />
            <button
              onClick={() => deleteBanner(banner._id)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;
