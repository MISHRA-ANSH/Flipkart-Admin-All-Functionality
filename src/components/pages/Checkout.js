import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Checkout.css";

const Checkout = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "COD",
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = totalPrice * 0.1;
  const finalPrice = totalPrice - discount;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      paymentMethod: formData.paymentMethod,
      date: new Date().toLocaleString(),
      items: [...cart],
      total: finalPrice.toFixed(2),
    };

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    // Clear the cart
    cart.forEach((item) => removeFromCart(item.id));

    alert("Order Placed Successfully!");
    navigate("/orders");
  };

  return (
    <div className="checkout-container">
      <h2 className="text-center">🛒 Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Address:</label>
        <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>

        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Payment Method:</label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI Payment</option>
          <option value="CreditCard">Credit Card</option>
        </select>

        <button type="submit" className="btn btn-success">✅ Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
