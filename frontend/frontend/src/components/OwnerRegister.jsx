import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function OwnerRegister() {
  const [form, setForm] = useState({ username: "", password: "", shop_name: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register/", form);
      alert("🏪 Shop registered successfully! Please login as owner.");
      navigate("/owner/login");
    } catch (err) {
      if (err.response?.status === 400) {
        alert("⚠️ Shop owner already exists! Please login.");
        navigate("/owner/login");
      } else {
        alert("Registration failed. Try again!");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏪 Owner Registration</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Enter Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Enter Shop Name"
          value={form.shop_name}
          onChange={(e) => setForm({ ...form, shop_name: e.target.value })}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Register Shop</button>
      </form>

      <p style={styles.text}>
        Already have an account?{" "}
        <Link to="/owner/login" style={styles.link}>Login here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "90px auto",
    padding: "35px",
    background: "linear-gradient(135deg, #ffe6f2, #ffd6e0)",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(255, 105, 135, 0.3)",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    color: "#ff4d6d",
    marginBottom: "20px",
    fontSize: "1.8rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ffb6c1",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    background: "linear-gradient(135deg, #ff4d6d, #ff8fab)",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "transform 0.2s",
  },
  text: {
    marginTop: "15px",
    color: "#444",
  },
  link: {
    color: "#ff4d6d",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
