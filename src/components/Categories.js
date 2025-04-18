import React from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";


const categoriesData = [
  { name: "Kilos", image: "https://rukminim2.flixcart.com/flap/80/80/image/29327f40e9c4d26b.png?q=100" },
  { name: "Mobiles", image: "https://rukminim2.flixcart.com/flap/80/80/image/22fddf3c7da4c4f4.png?q=100" },
  { name: "Fashion", image: "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0d75b34f7d8fbcb3.png?q=100" },
  { name: "Electronics", image: "https://rukminim2.flixcart.com/flap/80/80/image/69c6589653afdb9a.png?q=100" },
  { name: "Home & Furniture", image: "https://rukminim2.flixcart.com/flap/80/80/image/ab7e2b022a4587dd.jpg?q=100" },
  { name: "Appliances", image: "https://rukminim2.flixcart.com/fk-p-flap/80/80/image/0139228b2f7eb413.jpg?q=100" },
  { name: "Flight Bookings", image: "https://rukminim2.flixcart.com/flap/80/80/image/71050627a56b4693.png?q=100" },
  { name: "Beauty, Toys & More", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/motorcycle/e/e/3/disc-brake-self-kick-super-splendor-xtec-disc-disc-125-booking-original-imah63gbmzpjcdbg.jpeg?q=70" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === "Fashion") {
      window.location.href = "/fashion"; // ✅ This forces a full-page reload
    }
  };

  return (
    <div className="categories-container">
      {categoriesData.map((cat, index) => (
        <div className="category-item" key={index} onClick={() => handleCategoryClick(cat.name)}>
          <img src={cat.image} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
