import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/user/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left" onClick={() => navigate("/user/dashboard")}>
        🍭 <span className="brand">SweetShop</span>
      </div>

      <div className="nav-links">
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}
