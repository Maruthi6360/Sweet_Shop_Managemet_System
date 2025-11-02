import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function OwnerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/owner/login");
  };

  return (
    <nav className="owner-navbar">
      {/* Left section - brand logo */}
      <div className="owner-nav-left" onClick={() => navigate("/owner/dashboard")}>
        🍬 <span className="owner-brand">SweetShop <span className="highlight">Owner</span></span>
      </div>

      {/* Right section - links */}
      <div className="owner-nav-links">
        <Link to="/owner/dashboard" className="owner-nav-link">All Sweets</Link>
        <Link to="/owner/add-sweet" className="owner-nav-link add-btn">➕ Add Item</Link>
        <button onClick={handleLogout} className="owner-logout-btn">🚪 Logout</button>
      </div>
    </nav>
  );
}
