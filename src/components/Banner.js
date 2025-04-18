import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const banners = [
  {
    image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/41c2a4bb01643f73.jpg?q=50",
    heading: "Biggest Deals on Top Brands!",
    subheading: "Up to 70% Off on Electronics, Fashion & More",
    cta: "Shop Now",
  },
  {
    image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/8921fc73c192a29f.jpg?q=50",
    heading: "Upgrade Your Home Essentials",
    subheading: "Latest Furniture & Decor at Best Prices",
    cta: "Explore",
  },
  {
    image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/373914b13f0b4dfb.jpg?q=50",
    heading: "Fashion Sale is Live!",
    subheading: "Trendy Outfits & Accessories – Shop Now!",
    cta: "Grab Deals",
  },
  {
    image: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/41c2a4bb01643f73.jpg?q=50",
    heading: "Limited Time Offers!",
    subheading: "Grab Your Favorite Products at Unbeatable Prices",
    cta: "Shop Now",
  },
];

// Custom Arrow Component
const CustomPrevArrow = ({ onClick }) => (
  <button className="banner-prev" onClick={onClick}>
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="banner-next" onClick={onClick}>
    <FaChevronRight />
  </button>
);

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 800,
  autoplaySpeed: 3000,
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

const Banner = () => {
  return (
    <div className="banner-container">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="banner-slide">
            <img src={banner.image} alt={`Banner ${index + 1}`} loading="lazy" />
            <div className="banner-content">
              <h1>{banner.heading}</h1>
              <p>{banner.subheading}</p>
              <button>{banner.cta}</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
