import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "password123") {
      localStorage.setItem("adminAuth", JSON.stringify({ email })); // Store admin info
      navigate("/admin"); // Redirect to Admin Dashboard
    } else {
      alert("Invalid Credentials! Try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Section (Info) */}
      <div className="login-left">
        <h2>Admin Access</h2>
        <p>Manage products, orders, and users seamlessly.</p>
        <p>Secure access to admin functionalities.</p>
      </div>

      {/* Right Section (Form) */}
      <div className="login-right">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <a href="#" className="forgot-password">
            Forgot Password?
          </a>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="or">OR</div>

          <button className="otp-button">Login with OTP</button>

          <div className="signup-prompt">
            Not an admin? <a href="/">Go to Homepage</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
