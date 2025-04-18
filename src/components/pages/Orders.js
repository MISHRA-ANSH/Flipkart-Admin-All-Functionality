import React, { useState, useEffect } from "react";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const reorder = (order) => {
    const newOrder = { ...order, id: Date.now(), date: new Date().toLocaleString() };
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert("Order Reordered Successfully!");
  };

  return (
    <div className="orders-container">
      <h2>📦 My Order History</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet!</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p><strong>Placed on:</strong> {order.date}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p>
              <strong>Status:</strong>
              <select value={order.status || "Processing"} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </p>

            <h4>Ordered Items:</h4>
            <ul className="order-items">
              {order.items.map((item) => (
                <li key={item.id} className="order-item">
                  {item.name} - ₹{item.price} (x{item.quantity})
                </li>
              ))}
            </ul>

            <h4>Total: ₹{order.total}</h4>
            <button className="reorder-btn" onClick={() => reorder(order)}>🔄 Reorder</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
