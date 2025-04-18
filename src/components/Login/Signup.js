import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import signupImage from "./imagesFK.png";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
     // Check if email already exists
     if (existingUsers.some(user => user.email === formData.email)) {
      alert("Email already registered! Please use a different email.");
      return;
    }

   // Password validation (minimum 6 characters)
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Store user in localStorage
    existingUsers.push(formData);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Signup Successful! Please log in.");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="signup-left">
        <h2>Sign Up</h2>
        <p>Join us to explore amazing products & offers!</p>
        <img src={signupImage} alt="Signup Illustration" className="auth-image" />
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Create Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter a strong password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">Register</button>
        </form>

        <p className="or">OR</p>
        <button className="otp-button">Sign Up with OTP</button>
        <p className="login-prompt">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
