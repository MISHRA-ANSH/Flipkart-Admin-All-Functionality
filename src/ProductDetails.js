import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "./data"; // ✅ Import from data.js instead of product.json

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-64 mx-auto mt-4 rounded-lg shadow-md" />
      <p className="text-lg text-gray-700 mt-2">{product.description}</p>
      <p className="text-2xl font-semibold mt-2 text-blue-600">₹{product.price}</p>
      <Link to="/" className="text-blue-500 mt-4 block underline">Back to Products</Link>
    </div>
  );
};

export default ProductDetails;
