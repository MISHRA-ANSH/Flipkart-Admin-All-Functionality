import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../components/pages/ProductDetails'; // Adjust the path as necessary

const ProductDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <ProductDetails productId={id} />
    </div>
  );
};

export default ProductDetailsPage;