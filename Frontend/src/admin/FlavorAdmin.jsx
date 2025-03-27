import { useEffect, useState } from "react";
import axios from "axios";

const FlavorAdmin = () => {
  const [flavors, setFlavors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    heading: "",
    price: "",
    image: null,
  });

  const fetchFlavors = async () => {
    const res = await axios.get("http://localhost:5000/api/flavors");
    setFlavors(res.data);
  };

  useEffect(() => {
    fetchFlavors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const createFlavor = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("heading", form.heading);
    data.append("price", form.price);
    data.append("image", form.image);

    await axios.post("http://localhost:5000/api/flavors", data);
    fetchFlavors();
    setForm({ name: "", heading: "", price: "", image: null });
  };

  const deleteFlavor = async (id) => {
    await axios.delete(`http://localhost:5000/api/flavors/${id}`);
    fetchFlavors();
  };

  return (
    <div>
      <h2>Manage Flavors</h2>
      <form onSubmit={createFlavor}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="heading" value={form.heading} onChange={handleChange} placeholder="Heading" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <input type="file" onChange={handleFile} />
        <button type="submit">Add Flavor</button>
      </form>

      <hr />

      <ul>
        {flavors.map((fl) => (
          <li key={fl._id}>
            <h4>{fl.name}</h4>
            <p>{fl.heading}</p>
            <strong>Rs. {fl.price}</strong>
            {fl.image && (
              <img
                src={`http://localhost:5000/uploads/${fl.image}`}
                alt={fl.name}
                width="100"
              />
            )}
            <button onClick={() => deleteFlavor(fl._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlavorAdmin;
