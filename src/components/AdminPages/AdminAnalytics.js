import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import "./AdminAnalytics.css";

const AdminAnalytics = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [orderStats, setOrderStats] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];

    setTotalUsers(users.length);
    setTotalOrders(orders.length);
    setTotalProducts(products.length);
    setTotalRevenue(
      orders.reduce((sum, order) => sum + order.items.reduce((acc, item) => acc + Number(item.price), 0), 0)
    );

    setOrderStats(
      orders.map((order, index) => ({
        name: `Order ${index + 1}`,
        value: order.items.length,
      }))
    );
  }, []);

  // Colors for Pie Chart
  const COLORS = ["#2874f0", "#ff4d4d", "#ffcc00", "#00cc99", "#ff66b2"];

  return (
    <div className="admin-analytics">
      <h2>Dashboard Analytics</h2>
      
      {/* Stats Overview */}
      <div className="stats-container">
        <div className="stat-card">Users: {totalUsers}</div>
        <div className="stat-card">Orders: {totalOrders}</div>
        <div className="stat-card">Revenue: ₹{totalRevenue}</div>
        <div className="stat-card">Products: {totalProducts}</div>
      </div>

      {/* Charts Section */}
      <div className="chart-section">
        {/* Bar Chart */}
        <div className="bar-chart">
          <h3>Order Statistics (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={orderStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2874f0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="pie-chart">
          <h3>Order Distribution (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {orderStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
