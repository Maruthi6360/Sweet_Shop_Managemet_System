import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function UserRegister() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register/", form);
      alert("🎉 Registered successfully! Please login.");
      navigate("/user/login");
    } catch (err) {
      if (err.response?.status === 400) {
        alert("⚠️ User already exists! Please login.");
        navigate("/user/login");
      } else {
        alert("Registration failed. Try again!");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 User Registration</h2>

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

        <button type="submit" style={styles.button}>Register</button>
      </form>

      <p style={styles.text}>
        Already have an account?{" "}
        <Link to="/user/login" style={styles.link}>Login here</Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "90px auto",
    padding: "30px",
    background: "linear-gradient(135deg, #ffe3ec, #ffc2d1)",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(255, 105, 135, 0.3)",
    textAlign: "center",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    color: "#ff4d6d",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
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
