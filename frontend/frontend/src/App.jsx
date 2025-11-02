import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import OwnerNavbar from "./components/OwnerNavbar";
import UserNavbar from "./components/UserNavbar";

import UserLogin from "./components/UserLogin";
import OwnerLogin from "./components/OwnerLogin";
import UserRegister from "./components/UserRegister";
import OwnerRegister from "./components/OwnerRegister";
import UserDashboard from "./components/UserDashboard";
import OwnerDashboard from "./components/OwnerDashboard";
import AddSweet from "./components/AddSweet";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* General public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/user/login" element={<><Navbar /><UserLogin /></>} />
        <Route path="/user/register" element={<><Navbar /><UserRegister /></>} />
        <Route path="/owner/login" element={<><Navbar /><OwnerLogin /></>} />
        <Route path="/owner/register" element={<><Navbar /><OwnerRegister /></>} />

        {/* User protected routes */}
        <Route
          path="/user/dashboard"
          element={
            <>
              <UserNavbar />
              <UserDashboard />
            </>
          }
        />

        {/* Owner protected routes */}
        <Route
          path="/owner/dashboard"
          element={
            <>
              <OwnerNavbar />
              <OwnerDashboard />
            </>
          }
        />
        <Route
          path="/owner/add-sweet"
          element={
            <>
              <OwnerNavbar />
              <AddSweet />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

/* Landing Page (Home) */
function LandingPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h1 style={{ color: "#ff5d8f", fontSize: "2.5rem" }}>🍬 Welcome to SweetShop</h1>
        <p style={{ color: "#555", marginTop: "10px" }}>
          Please choose <strong>User Login</strong> or <strong>Owner Login</strong> from the top navigation bar.
        </p>
      </div>
    </>
  );
}
