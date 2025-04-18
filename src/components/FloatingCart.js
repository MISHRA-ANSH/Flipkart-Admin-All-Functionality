import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./FloatingCart.css";

const FloatingCart = () => {
  const [cartCount, setCartCount] = useState(3); // Example cart count
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="floating-cart-container">
      {/* Floating Cart Icon */}
      <div className="floating-cart" onClick={() => setShowCart(!showCart)}>
        <FaShoppingCart className="cart-icon" />
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </div>

      {/* Cart Details (Appears on Click) */}
      {showCart && (
        <div className="cart-details">
          <h3>Shopping Cart</h3>
          <p>Total Items: {cartCount}</p>
          <button className="checkout-btn">Go to Cart</button>
        </div>
      )}
    </div>
  );
};

export default FloatingCart;
