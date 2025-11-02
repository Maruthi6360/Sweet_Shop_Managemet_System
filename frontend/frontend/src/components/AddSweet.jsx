import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddSweet() {
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const navigate = useNavigate();

  const handleAddSweet = async () => {
    if (!form.name || !form.category || !form.price || !form.quantity)
      return alert("Please fill in all fields");

    try {
      const token = localStorage.getItem("token");
      await API.post("/sweets/", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Sweet added successfully!");
      navigate("/owner/dashboard"); 
    } catch (err) {
      console.error("Error adding sweet:", err.response?.data || err.message);
      alert("Failed to add sweet");
    }
  };

  return (
    <div className="add-sweet-container">
      <h2>🍩 Add a New Sweet</h2>
      <input
        type="text"
        placeholder="Sweet Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
      <button onClick={handleAddSweet}>Add Sweet</button>
      <a href="/owner/dashboard" className="back-link">← Back to All Sweets</a>
    </div>
  );
}
