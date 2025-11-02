import API from "../services/api";

export default function SweetCard({ sweet, isOwner, refresh }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await API.delete(`/sweets/${sweet.id}/`, { headers: { Authorization: `Bearer ${token}` } });
    alert("Sweet deleted!");
    refresh();
  };

  const handlePurchase = async () => {
    const token = localStorage.getItem("token");
    await API.post(`/sweets/${sweet.id}/purchase/`, {}, { headers: { Authorization: `Bearer ${token}` } });
    alert("Purchase successful!");
    refresh();
  };

  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Quantity: {sweet.quantity}</p>
      <p><strong>Shop:</strong> {sweet.shop?.name || "N/A"}</p>

      <div className="sweet-actions">
        {isOwner ? (
          <>
            <button className="edit-btn">✏️ Update</button>
            <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
          </>
        ) : (
          <button className="purchase-btn" onClick={handlePurchase}>🛒 Purchase</button>
        )}
      </div>
    </div>
  );
}
