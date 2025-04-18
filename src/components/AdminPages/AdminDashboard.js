import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageProducts from "./ManageProducts";
import ManageUsers from "./ManageUsers";
import AdminAnalytics from "./AdminAnalytics";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend as PieLegend } from "recharts";
import "./AdminDashboard.css";
import { LineChart, Line } from "recharts";
import io from "socket.io-client";
import { FaShoppingCart ,FaUser,FaCog , FaBoxOpen, FaChartBar, FaSignOutAlt } from "react-icons/fa";


const socket = io("http://localhost:5000");

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [adminData, setAdminData] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [topSelling, setTopSelling] = useState([]);
  const [leastPerforming, setLeastPerforming] = useState([]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Load orders and products from localStorage
useEffect(() => {
  setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  setProducts(JSON.parse(localStorage.getItem("products")) || []);

  socket.on("orderStatusUpdated", (updatedOrders) => {
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  });

  return () => socket.off("orderStatusUpdated");
}, []);

useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}, [darkMode]);


  useEffect(() => {
    const salesData = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        salesData[item.name] = (salesData[item.name] || 0) + 1;
      });
    });
    

    const sortedProducts = Object.entries(salesData)
      .sort((a, b) => b[1] - a[1])
      .map(([name, sales]) => ({ name, sales }));

    setTopSelling(sortedProducts.slice(0, 5));
    setLeastPerforming(sortedProducts.slice(-5));
  }, [orders]);


 // Load admin and users data
useEffect(() => {
  const storedAdmin = JSON.parse(localStorage.getItem("adminAuth"));
  if (!storedAdmin) {
    navigate("/admin-login");
  } else {
    setAdminData(storedAdmin);
  }
  setUsers(JSON.parse(localStorage.getItem("users")) || []);
}, [navigate]);

// Calculate Top-Selling and Least-Performing Products
useEffect(() => {
  const salesData = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      salesData[item.name] = (salesData[item.name] || 0) + 1;
    });
  });

  const sortedProducts = Object.entries(salesData)
    .sort((a, b) => b[1] - a[1])
    .map(([name, sales]) => ({ name, sales }));

  setTopSelling(sortedProducts.slice(0, 5));
  setLeastPerforming(sortedProducts.slice(-5));
}, [orders]);


  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  const filterOrders = () => {
    const now = new Date();
    if (filter === "7days") {
      return orders.filter(order => new Date(order.date) >= new Date(now.setDate(now.getDate() - 7)));
    } else if (filter === "month") {
      return orders.filter(order => new Date(order.date) >= new Date(now.setMonth(now.getMonth() - 1)));
    }
    return orders;
  };

  const filteredOrders = filterOrders();

  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.items.reduce((total, item) => total + Number(item.price), 0), 0);

  const orderStats = filteredOrders.map((order) => ({
    name: order.date.split(",")[0],
    items: order.items.length,
  }));

  const salesData = [
    { name: "Sales", value: totalRevenue },
    { name: "Returns", value: 5000 }, // Example return data
  ];

  const categorySalesData = products.reduce((acc, product) => {
    const category = product.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + Number(product.price);
    return acc;
  }, {});

    // Sales Trend Data
    const salesTrendData = filteredOrders.map((order) => ({
      date: order.date.split(",")[0],
      revenue: order.items.reduce((total, item) => total + Number(item.price), 0),
    }));

  const categorySalesArray = Object.keys(categorySalesData).map((key) => ({
    name: key,
    value: categorySalesData[key],
  }));

  return (
    <div className={`admin-dashboard ${darkMode ? "dark" : ""}`}>
      <aside className="sidebar">
        <h2>Admin Panel</h2>
       
        <ul>
          <li className={activeTab === "Dashboard" ? "active" : ""}
           onClick={() => setActiveTab("dashboard")}><FaChartBar /> Dashboard</li>
            <li className={activeTab === "Products" ? "active" : ""}
               onClick={() => setActiveTab("products")}>            <FaBoxOpen /> Products</li>
          <li className={activeTab === "Users" ? "active" : ""}
           onClick={() => setActiveTab("users")}><FaUser /> Users</li>
           <li className={activeTab === "Orders" ? "active" : ""}
    onClick={() => setActiveTab("orders")}>
    <FaShoppingCart /> Orders</li>
            <li className={activeTab === "Settings" ? "active" : ""}
    onClick={() => setActiveTab("settings")}>
    <FaCog /> Settings</li>
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /> Logout</button>
          </div>
        </ul>
      </aside>

      <main className="dashboard-content">
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
          {darkMode ? "☀️ " : "🌙 "}
        </button>
        {activeTab === "dashboard" && (
          <div>
            <h2>Welcome, {adminData?.email}! 🚀</h2>
            <div className="filter-options">
              <label>Filter Orders: </label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="7days">Last 7 Days</option>
                <option value="month">Last Month</option>
              </select>
            </div>
            <div className="stats">
              <div>Total Users: {users.length}</div>
              <div>Total Orders: {filteredOrders.length}</div>
              <div>Total Revenue: ₹{totalRevenue}</div>
              <div>Total Products: {products.length}</div>
            </div>
              {/* Sales Trend Chart */}
            <div className="chart-container">
              <h3>Sales Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#ff7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={orderStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="items" fill="#2874f0" />
              </BarChart>
            </ResponsiveContainer>

            {/* Comparison Chart: Sales vs Returns */}
            <div className="comparison-chart">
              <h3>Sales vs Returns</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#2874f0" />
                </BarChart>
              </ResponsiveContainer>
            </div>

{/* Sales Breakdown & Product Performance Section */}
<div className="sales-product-container">
  {/* Category-Wise Sales Breakdown */}
  <div className="category-sales-chart">
    <h3>Category-Wise Sales Breakdown</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categorySalesArray}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#2874f0"
        >
          {categorySalesArray.map((entry, index) => (
            <Cell key={index} fill={index % 2 === 0 ? "#2874f0" : "#ff7300"} />
          ))}
        </Pie>
        <PieLegend />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Top-Selling and Least-Performing Products */}
 <div className="product-stats">
  {/* Top-Selling Products */}
  <div className="top-products">
    <h3>Top-Selling Products</h3>
    <ul>
      {topSelling.length > 0 ? (
        topSelling.map((product, index) => (
          <li key={index}>iphone 15 :- {product.sales} sales</li>
        ))
      ) : (
        <p>No sales data available.</p>
      )}
    </ul>
  </div>

  {/* Least-Performing Products */}
  <div className="least-products">
    <h3>Least-Performing Products</h3>
    <ul>
      {leastPerforming.length > 0 ? (
        leastPerforming.map((product, index) => (
          <li  key={index}>oppo :- {product.sales} sales</li>
        ))
      ) : (
        <p>No sales data available.</p>
      )}
    </ul>
  </div>
</div>

</div>

      {/* Order Status Table */}
      <div className="orders-section">
        <h3>Real-Time Order Status</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      socket.emit("updateOrderStatus", { orderId: order.id, status: e.target.value });
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          </div>
        )}
        {activeTab === "users" && <ManageUsers />}
        {activeTab === "analytics" && <AdminAnalytics />}
        {activeTab === "products" && <ManageProducts />}
      </main>
    </div>

  );
};

export default AdminDashboard;
