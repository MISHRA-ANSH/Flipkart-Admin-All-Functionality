import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "./imagesFK.png";



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
         // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      window.dispatchEvent(new Event("storage"));  // ✅ Force update Navbar

      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid email or password. Try again!");
    }
    };

    return (
        <div className="login-container">
            {/* Left Section */}
            <div className="login-left">
                <h2>Login</h2>
                <p>Get access to your Orders, Wishlist and Recommendations</p>
                <img src={loginImage} alt="Login Illustration" className="login-image" />

            </div>

            {/* Right Section */}
            <div className="login-right">
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Enter Email/Mobile Number</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Enter Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#" className="forgot-password">Forgot?</a>
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>

                <p className="or">OR</p>
                <button className="otp-button">Request OTP</button>
                <p className="signup-prompt">New to Flipkart? <Link to="/Signup"><a href="#">Create an account</a></Link></p>
            </div>
        </div>
    );
};

export default Login;
