import Filter from "../filter/Filter"; 
import ProductList from "../product/ProductList";  
import products from "../../data/product.json";
import filters from "../../data/filters.json";
import "./product-page.css";
import { useReducer } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { filterReducer, INITIAL_FILTER } from "./filterReducer";

export default function ProductPage() {

    
  const [userFilter, userFilterDispatch] = useReducer(
    filterReducer,
    INITIAL_FILTER
  );

  return (
    <div className="product-page-container">
      <Filter
        filters={filters}
        userFilterPref={userFilter}
        userFilterDispatch={userFilterDispatch}
      />
      <ProductList products={products} userFilterPref={userFilter} />
    </div>
  );
}
