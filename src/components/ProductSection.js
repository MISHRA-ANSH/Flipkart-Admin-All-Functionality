import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Import heart icon
import './ProductSection.css'; // Add CSS for styling

const ProductSection = ({ title, products, currentPage, totalPages, nextPage, prevPage }) => {
  const [wishlist, setWishlist] = useState([]);
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const [showPopup, setShowPopup] = useState(false); // State for showing popup

  // Load Wishlist from Local Storage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  // Toggle Wishlist Function
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      let updatedWishlist;
      if (prevWishlist.some((item) => item.id === product.id)) {
        updatedWishlist = prevWishlist.filter((item) => item.id !== product.id);
        showPopupMessage("Removed from Wishlist");
      } else {
        updatedWishlist = [...prevWishlist, product];
        showPopupMessage("Added to Wishlist");
      }
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  // Show Popup Notification
  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide after 2 seconds
  };

  return (
    <div className="product-section">
      <h2>{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image || product.img} alt={product.name || product.displayName} />
              <h3>{product.name || product.displayName}</h3>
              <p>Price: ₹{product.price}</p>
              {product.basePrice && <p className="base-price">Original Price: ₹{product.basePrice}</p>}
              {product.rating && <p className="rating">Rating: {product.rating} ★</p>}
            </Link>
            
            {/* Wishlist Button */}
            <button 
              className={`wishlist-btn ${wishlist.some((item) => item.id === product.id) ? 'active' : ''}`} 
              onClick={() => toggleWishlist(product)}
            >
              <FaHeart className="wishlist-icon" />
            </button>
          </div>
        ))}
      </div>

      {/* Popup Notification */}
      {showPopup && <div className="wishlist-popup">{popupMessage}</div>}

      {/* 🔹 Pagination Buttons */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
