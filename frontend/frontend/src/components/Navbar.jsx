import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="main-navbar">
      <div className="nav-left" onClick={() => navigate("/")}>
        🍬 <span className="brand">SweetShop</span>
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <Link to="/user/login" className="nav-btn user-btn">
              👤 User Login
            </Link>
            <Link to="/owner/login" className="nav-btn owner-btn">
              🏪 Owner Login
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-btn logout-btn">
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
}
