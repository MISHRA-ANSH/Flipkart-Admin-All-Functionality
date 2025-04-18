import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")) || {});
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem("orders")) || []);
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdated, setIsUpdated] = useState(false); // ✅ State to track update

  // Handle Profile Update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem("currentUser", JSON.stringify(user));
    setIsUpdated(true); // ✅ Change button text after saving
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="dashboard-container">
      <h2>👤 User Dashboard</h2>
      <div className="dashboard-tabs">
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile Settings</button>
        <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>Order History</button>
      </div>

      {activeTab === "profile" && (
        <div className="profile-section">
          <h3>Profile Settings</h3>
          <form onSubmit={handleProfileUpdate}>
            <label>Name:</label>
            <input type="text" value={user.name || ""} onChange={(e) => { setUser({ ...user, name: e.target.value }); setIsUpdated(false); }} required />

            <label>Email:</label>
            <input type="email" value={user.email || ""} disabled />

            <label>Address:</label>
            <input type="text" value={user.address || ""} onChange={(e) => { setUser({ ...user, address: e.target.value }); setIsUpdated(false); }} required />

            <label>Phone:</label>
            <input type="text" value={user.phone || ""} onChange={(e) => { setUser({ ...user, phone: e.target.value }); setIsUpdated(false); }} required />

            {/* ✅ Button changes dynamically based on isUpdated state */}
            <button type="submit">{isUpdated ? "Update" : "Save Changes"}</button>
          </form>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="order-history-section">
          <h3>📦 Order History</h3>
          {orders.length === 0 ? (
            <p>No orders found!</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="order-card">
                <h4>Order ID: {order.id}</h4>
                <p>Placed on: {order.date}</p>
                <p>Total: ₹{order.total}</p>
                <button className="reorder-btn" onClick={() => alert("Reordering...")}>🔄 Reorder</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
