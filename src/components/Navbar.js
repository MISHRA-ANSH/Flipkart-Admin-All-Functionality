import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaStore, FaUser, FaEllipsisV, FaClipboardList } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { cart, removeFromCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("orders")) || []); // ✅ Load from localStorage
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Handle Search
  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  // Toggle Hamburger Menu
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add products before ordering.");
      return;
    }

    const newOrder = {
      id: Date.now(), // Unique ID
      items: [...cart], // Save cart items
      date: new Date().toLocaleString(), // Order Date & Time
    };

    // Update orders state
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);

    // Store in localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Clear the cart (simulate purchase)
    cart.forEach((item) => removeFromCart(item.id));
  };


 // Check localStorage for user data only after login
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(storedUser);
    };

    // Listen for changes in localStorage (login/logout)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  
  // Toggle Login Dropdown
  const toggleLoginDropdown = () => {
    setShowLoginDropdown((prev) => !prev);
  };
  

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("adminAuth"); // ✅ Remove admin authentication if applicable

    setUser(null);
    alert("Logged out successfully!");
    navigate("/");
  };
// Redirect to Admin Login for Seller
const handleBecomeSeller = () => {
  if (user?.role === "admin") {
    navigate("/admin");
  } else {
    navigate("/admin-login");
  }
};

  return (
    <div className="navbar-container">
      <div className="navbar">
        {/* Left Section */}
        <div className="navbar-left">
          <img className="navbar-logo" src="/images/flipkart-logo.svg" alt="Flipkart Logo" />
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for Products, Brands and More"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => console.log("Searching for:", searchTerm)}>
              <FaSearch />
            </button>
          </div>
        </div>

     {/* Right Section */}
     <div className="navbar-right">
          {/* User Section (Login / Dropdown) */}
          {/* User Section (Login / Dropdown) */}
<div className="user-section">
  {user ? (
    <>
      <Link to="/dashboard">
        <span className="user-name">👤 {user.name} </span>
      </Link>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </>
  ) : (
    <button className="login-btn" onClick={toggleLoginDropdown}>
      <FaUser className="login-icon" /> Login
    </button>
  )}

  {/* Dropdown for Login / Sign Up */}
  {showLoginDropdown && !user && (
    <div className="login-dropdown">
      <Link to="/login"><span>Login</span></Link>
      <Link to="/signup"><span>Sign Up</span></Link>
      <p>My Profile</p>
      <p onClick={handleBecomeSeller} className="dropdown-link">Admin Login</p> {/* ✅ Updated */}
      <p>Flipkart Plus Zone</p>
      <p>Orders</p>
      <p>Wishlist</p>
      <p>Rewards</p>
      <p>Gift Cards</p>
    </div>
  )}
</div>

          {/* Become a Seller (Admin Login) */}
          <div className="more-options" >
            <FaStore /> Become a Seller
          </div>

          {/* Cart */}
          <div className="cart">
            <Link to="/cart">
              <FaShoppingCart />
              <span>Cart ({cart.length})</span>
            </Link>
          </div>

          {/* My Orders */}
          <div className="orders">
            <Link to="/orders">
              <FaClipboardList />
              <span>My Orders</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
