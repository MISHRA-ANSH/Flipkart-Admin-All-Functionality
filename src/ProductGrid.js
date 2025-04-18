import React from "react";
import { useNavigate } from "react-router-dom";
import products from "./data"; // ✅ Import from data.js instead of product.json

const ProductGrid = () => {
  const navigate = useNavigate();

  const handleNavigation = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Product List</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 hover:shadow-xl cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleNavigation(product.id)}
          >
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2 text-center">{product.name}</h2>
            <p className="text-gray-600 text-center">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
