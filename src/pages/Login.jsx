import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      // store login state
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard"); // ✅ enter FinanceHub
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">USER LOGIN</h2>

        <form onSubmit={handleLogin}>
          <div className="input-box">
            <span className="icon">👤</span>
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <span className="icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot">Forgot Password?</span>
          </div>

          <button className="login-btn" type="submit">
            LOGIN
          </button>
        </form>

        <Link to="/signup" className="register-btn">
          REGISTER
        </Link>
      </div>
    </div>
  );
}

export default Login;
