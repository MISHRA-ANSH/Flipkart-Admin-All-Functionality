const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(cors());
app.use(express.json());

// MySQL connection pool setup
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "your_password",
  database: "your_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Existing orders data and socket.io code
let orders = [
  { id: 1, status: "Pending", items: 5 },
  { id: 2, status: "Shipped", items: 3 },
  { id: 3, status: "Delivered", items: 7 },
];

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send initial orders
  socket.emit("orderStatusUpdated", orders);

  // Update order status
  socket.on("updateOrderStatus", ({ orderId, status }) => {
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      io.emit("orderStatusUpdated", orders);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// API to get all products with seller name
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.name, p.seller_id, s.name AS seller_name, p.stock_quantity, p.price, p.status, p.updated_at
       FROM products p
       LEFT JOIN sellers s ON p.seller_id = s.id`
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// API to update product stock quantity
app.put("/api/products/:id/stock", async (req, res) => {
  const productId = req.params.id;
  const { stock_quantity } = req.body;
  if (stock_quantity === undefined) {
    return res.status(400).json({ error: "stock_quantity is required" });
  }
  try {
    const [result] = await pool.query(
      "UPDATE products SET stock_quantity = ?, updated_at = NOW() WHERE id = ?",
      [stock_quantity, productId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Stock quantity updated successfully" });
  } catch (error) {
    console.error("Error updating stock quantity:", error);
    res.status(500).json({ error: "Failed to update stock quantity" });
  }
});

// API to update product status
app.put("/api/products/:id/status", async (req, res) => {
  const productId = req.params.id;
  const { status } = req.body;
  const validStatuses = ["Active", "Inactive", "Out of Stock"];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid or missing status" });
  }
  try {
    const [result] = await pool.query(
      "UPDATE products SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, productId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product status updated successfully" });
  } catch (error) {
    console.error("Error updating product status:", error);
    res.status(500).json({ error: "Failed to update product status" });
  }
});

server.listen(5000, () => {
  console.log("WebSocket Server running on port 5000 🚀");
});
