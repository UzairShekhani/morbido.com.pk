import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BannerAdmin = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState('home');

  const fetchBanners = async () => {
    const res = await axios.get(`/api/banners/${location}`);
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, [location]);

  const handleUpload = async () => {
    if (!image) return toast.error('Select image');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('location', location);

    try {
      await axios.post('/api/banners', formData);
      toast.success('Banner uploaded');
      setImage(null);
      fetchBanners();
    } catch (err) {
      toast.error('Upload failed');
    }
  };

  const deleteBanner = async (id) => {
    await axios.delete(`/api/banners/${id}`);
    toast.success('Deleted');
    fetchBanners();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Banners</h2>

      <div className="mb-4 flex gap-4 items-center">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="home">Home</option>
          <option value="product">Product</option>
        </select>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload Banner
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {banners.map((b) => (
          <div key={b._id} className="relative group">
            <img
              src={b.image}
              alt="Banner"
              className="rounded-xl w-full h-[150px] object-cover"
            />
            <button
              onClick={() => deleteBanner(b._id)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs group-hover:opacity-100 opacity-0 transition"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerAdmin;
