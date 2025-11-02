import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/app.css";

export default function UserDashboard() {
  const [sweets, setSweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all sweets from all shops
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

  // Refresh when search is cleared
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

  // Purchase sweet
  const handlePurchase = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        `/sweets/${id}/purchase/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchSweets(); // refresh updated quantity
    } catch (err) {
      console.error("Error purchasing sweet:", err);
      alert(err.response?.data?.error || "Failed to purchase sweet");
    }
  };

  return (
    <div className="sweet-container">
      <h2>🍬 Explore All Delicious Sweets</h2>

      {/* 🔍 Search Bar */}
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

      {/*  Sweet Cards */}
      <div className="sweet-grid">
        {sweets.length > 0 ? (
          sweets.map((sweet) => (
            <div className="sweet-card" key={sweet.id}>
              <h3>{sweet.name}</h3>
              <p>Category: {sweet.category}</p>
              <p>Price: ₹{sweet.price}</p>
              <p>Quantity: {sweet.quantity}</p>
              <p><strong>Shop:</strong> {sweet.shop?.name || "Unknown"}</p>

              <div className="sweet-actions">
                <button
                  className="purchase-btn"
                  onClick={() => handlePurchase(sweet.id)}
                  disabled={sweet.quantity <= 0}
                >
                  {sweet.quantity > 0 ? "🛒 Purchase" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No sweets available 🍭</p>
        )}
      </div>
    </div>
  );
}
