import React, { useState, useEffect } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import "./FashionPage.css";

const fashionProducts = [
  {
    id: 1,
    name: "Black Jacket",
    image:
      "https://rukminim1.flixcart.com/image/580/696/k2z1t3k0/jacket/5/d/z/9-10-years-abjkcrgfx19327-allen-solly-original-imafm4kftqz5ksgt.jpeg?q=50",
    price: 1789,
    rating: 4.2,
    category: "Winter Wear",
  },
  {
    id: 2,
    name: "Embellished Sweatshirt",
    image:
      "https://rukminim1.flixcart.com/image/434/521/kjbr8280-0/jacket/7/a/t/11-12-years-gj04-fort-collins-original-imafywuvnzkvvhxj.jpeg?q=50",
    price: 999,
    rating: 4.5,
    category: "Winter Wear",
  },
  {
    id: 3,
    name: "Printed Jacket",
    image:
      "https://rukminim1.flixcart.com/image/434/521/kfmv9u80/sweatshirt/h/m/v/5-6-years-mcbaw20ss009b-miss-chief-original-imafwfyvmgefy4tw.jpeg?q=50",
    price: 2400,
    rating: 4.0,
    category: "Winter Wear",
  },
  {
    id: 4,
    name: "Women Dress",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/e/u/z/s-ttsh001525-tokyo-talkies-original-imagthfyedpyhcfh.jpeg?q=70",
    price: 467,
    rating: 3.8,
    category: "Casual Wear",
  },
  {
    id: 5,
    name: "Kanjivaram Saree",
    image:
      "https://rukminim2.flixcart.com/image/612/612/xif0q/sari/m/b/q/free-jac02-anjavi-fashion-unstitched-original-imah87ymhhecswer.jpeg?q=70",
    price: 1299,
    rating: 4.7,
    category: "Ethnic Wear",
  },
  {
    id: 6,
    name: "Sport Shoes",
    image:
    "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/r/t/c/7-smoke-2-7-hotstyle-grey-original-imah4yhtbmgcrpt8.jpeg?q=70",
        price: 2990,
    rating: 4.7,
    category: "Casual Wear",
  },
  {
    id: 7,
    name: "Designer Saree",
    image:
    "https://rukminim2.flixcart.com/image/612/612/xif0q/sari/g/q/e/free-anisha-k-5-fashion-unstitched-original-imah4gxrfqa9p6qz.jpeg?q=70",
        price: 4000,
    rating: 4.9,
    category: "Ethnic Wear",
  },
  {
    id: 8,
    name: "Women Footwear",
    image:
    "https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-sandal/9/q/f/3-snmr-72-1-zaif-beige-original-imagtdv2mzhuhnmz.jpeg?q=70",
    price: 699,
    rating: 4.7,
    category: "Ethnic Wear",
  },
  {
    id: 9,
    name: "Full Sleeve Sweatshirt",
    image:
    "https://rukminim2.flixcart.com/image/612/612/xif0q/sweater/z/q/a/xl-ss-753-black-kajar-original-imah4m93yymgfkyt.jpeg?q=70",
        price: 800,
    rating: 4.5,
    category: "Winter Wear",
  },
  {
    id: 10,
    name: "Regular T-Shirt",
    image:
    "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/5/n/l-mens-henley-neck-tshirt-n-and-j-original-imahaapegk2zdupj.jpeg?q=70",
        price: 400,
    rating: 3.9,
    category: "Casual Wear",
  },
  {
    id: 11,
    name: "Formal Shirt",
    image:
   "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/o/g/i/xxl-deu017-deneeja-original-imah7v6ea6rfffxx.jpeg?q=70",
      price: 879,
    rating: 4.3,
    category: "Casual Wear",
  },
  {
    id: 12,
    name: "Dress",
    image:
    "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/r/w/2/xs-rudrama-3pc-rudrama-original-imahyxvsazzuhheu.jpeg?q=70",
     price: 1099,
    rating: 4.6,
    category: "Ethnic Wear",
  },

];

const FashionPage = () => {
  const [products, setProducts] = useState(fashionProducts);
  const [filteredProducts, setFilteredProducts] = useState(fashionProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    let updatedProducts = [...products];

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    updatedProducts = updatedProducts.filter(
      (product) => product.price <= priceRange
    );

    if (selectedRating > 0) {
      updatedProducts = updatedProducts.filter(
        (product) => product.rating >= selectedRating
      );
    }

    switch (sortOption) {
      case "price-low-high":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        updatedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, priceRange, selectedRating, sortOption]);

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.some((item) => item.id === product.id)
        ? prevWishlist.filter((item) => item.id !== product.id)
        : [...prevWishlist, product];

      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  return (
    <div className="fashion-page">
      {/* Filters Section */}
      <div className="filters">
        <h3>Filters</h3>

        {/* Category Filter */}
        <div>
          <h4>Category</h4>
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Winter Wear">Winter Wear</option>
            <option value="Casual Wear">Casual Wear</option>
            <option value="Ethnic Wear">Ethnic Wear</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <h4>Price Range</h4>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
          <p>Up to ₹{priceRange}</p>
        </div>

        {/* Rating Filter */}
        <div>
          <h4>Ratings</h4>
          <select onChange={(e) => setSelectedRating(Number(e.target.value))}>
            <option value="0">All Ratings</option>
            <option value="4">4★ & above</option>
            <option value="3">3★ & above</option>
          </select>
        </div>

        {/* Sorting Options */}
        <div>
          <h4>Sort By</h4>
          <select onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Popularity / Rating</option>
            <option value="price-high-low">Sort by Newest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Product Section */}
      <div className="product-section">
        <h2>Fashion Collection</h2>
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p className="rating">
                {product.rating} <FaStar className="star-icon" />
              </p>
              <button
                className={`wishlist-btn ${
                  wishlist.some((item) => item.id === product.id) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(product)}
              >
                <FaHeart />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FashionPage;
