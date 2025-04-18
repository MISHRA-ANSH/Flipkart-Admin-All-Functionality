import React from "react";
import "./PromotionalCards.css";

const promoCards = [
  {
    title: "Elevate your Experience with LG OLED TVs | Buy Now",
    image: "https://crescomanagement.com/wp-content/uploads/2024/11/3-1.png",
  },
  {
    title: "Get Minimum 40% Off on Levi's",
    image: "https://cdn.grabon.in/gograbon/images/merchant/1701759480947.jpg",
  },
  {
    title: "Buy Aashirvaad Atta Now",
    image: "https://www.bigbasket.com/media/uploads/flatpages/mailer-images-aug/30006887_100225_2.jpg",
  },
  {
    title: "OPPO F17 Pro (8GB) From ₹16,740",
    image: "https://images.livemint.com/img/2020/01/03/1600x900/OPPOOOOO_1578032481322.jpg",
  },
];

const PromotionalCards = () => {
  return (
    <div className="promo-section">
      <h2 className="promo-title">Explore</h2>
      <div className="promo-container">
        {promoCards.map((card, index) => (
          <div className="promo-card" key={index}>
            <img src={card.image} alt={card.title} loading="lazy" />
            <div className="promo-content">
              <p>{card.title}</p>
              <span className="arrow">➜</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionalCards;
