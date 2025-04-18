import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "./data/products.json"; // Import product data
import { useCart } from "./context/CartContext";
import "./ProductGrid.css";

const ProductGrid = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Clothing", "Footwear", "Electronics", "Accessories"];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.img} alt={product.displayName} />
              <h3>{product.displayName}</h3>
              <p>₹{product.price} <span className="base-price">₹{product.basePrice}</span></p>
              <p className="rating">⭐ {product.rating}</p>
            </Link>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
