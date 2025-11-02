import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/app.css";

export default function OwnerDashboard() {
  const [sweets, setSweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSweet, setEditingSweet] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // Fetch sweets belonging to this owner
  const fetchSweets = async (query = "") => {
    try {
      const token = localStorage.getItem("token");
      const url = query ? `/sweets/search/?q=${query}` : "/sweets/";
      const res = await API.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSweets(res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  // Refresh all sweets when search cleared
  useEffect(() => {
    if (searchQuery.trim() === "") {
      fetchSweets();
    }
  }, [searchQuery]);

  // Search sweets
  const handleSearch = (e) => {
    e.preventDefault();
    fetchSweets(searchQuery.trim());
  };

  // Delete sweet
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/sweets/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Sweet deleted successfully!");
      fetchSweets();
    } catch (err) {
      console.error("Error deleting sweet:", err);
      alert("Failed to delete sweet");
    }
  };

  // Edit sweet
  const handleEdit = (sweet) => {
    setEditingSweet(sweet.id);
    setEditForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
    });
  };

  // Update sweet
  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/sweets/${id}/`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Sweet updated successfully!");
      setEditingSweet(null);
      fetchSweets();
    } catch (err) {
      console.error("Error updating sweet:", err);
      alert("Failed to update sweet");
    }
  };

  return (
    <div className="sweet-container">
      <h2>🍭 Manage Your Shop Sweets</h2>

      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search sweets by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">🔍 Search</button>
      </form>

      {/* Sweet Cards */}
      <div className="sweet-grid">
        {sweets.length > 0 ? (
          sweets.map((sweet) => (
            <div className="sweet-card" key={sweet.id}>
              {editingSweet === sweet.id ? (
                <>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Sweet Name"
                  />
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={editForm.quantity}
                    onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}
                    placeholder="Quantity"
                  />
                  <button className="save-btn" onClick={() => handleUpdate(sweet.id)}>💾 Save</button>
                  <button className="cancel-btn" onClick={() => setEditingSweet(null)}>❌ Cancel</button>
                </>
              ) : (
                <>
                  <h3>{sweet.name}</h3>
                  <p>Category: {sweet.category}</p>
                  <p>Price: ₹{sweet.price}</p>
                  <p>Quantity: {sweet.quantity}</p>
                  <p><strong>Shop:</strong> {sweet.shop?.name || "N/A"}</p>

                  <div className="sweet-actions">
                    <button className="edit-btn" onClick={() => handleEdit(sweet)}>✏️ Update</button>
                    <button className="delete-btn" onClick={() => handleDelete(sweet.id)}>🗑️ Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>No sweets found 🍬</p>
        )}
      </div>
    </div>
  );
}
