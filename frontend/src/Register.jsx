import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "./api";
import "./App.css";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      // after successful register → go to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div className="center-container">
      <form className="card" onSubmit={handleRegister}>
        <h2>Register</h2>

        {error && <div className="error">{error}</div>}

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
