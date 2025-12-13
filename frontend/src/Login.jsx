import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { setToken } from "./api";
import "./App.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // ✅ token MUST exist now
      const token = res.data.token;

      if (!token) {
        setError("Login failed: token not received");
        return;
      }

      localStorage.setItem("token", token);
      setToken(token);

      navigate("/sweets");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="center-container">
      <form className="card" onSubmit={handleLogin}>
        <h2>Login</h2>

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

        <button type="submit">Login</button>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don&apos;t have an account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
