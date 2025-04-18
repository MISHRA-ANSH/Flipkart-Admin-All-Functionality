import { getDiscount } from "../../utils";
import "./product-card.css";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const { img, displayName, brand, price, basePrice, id, rating } = product;
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to Product Details Page
  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card" onClick={handleNavigate}>
      <img src={img} alt={displayName} />
      <div className="product-details">
        <p className="product-brand">{brand}</p>
        <p className="product-name">{displayName}</p>
        <div className="product-price-wrapper">
          <span className="product-price">₹{price}</span>
          <span className="product-base-price">₹{basePrice}</span>
          <span className="product-discount">
            {getDiscount(price, basePrice)}% off
          </span>
        </div>
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigation when clicking "Add to Cart"
            alert(`${displayName} added to cart!`);
          }}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}
