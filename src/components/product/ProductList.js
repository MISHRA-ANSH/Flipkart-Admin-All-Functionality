import React from "react";
import ProductCard from "./ProductCard";
import "./product-list.css";

export default function ProductList({ products, userFilterPref }) {
  function filterBrands(products) {
    const selectedBrands = getSelectedFilters("brands");
    if (selectedBrands.length === 0) {
      return products;
    }
    return products.filter((product) => {
      return selectedBrands.includes(product.brand);
    });
  }
  function filterIdealFor(products) {
    const selectedIdealFor = getSelectedFilters("idealFor");
    if (selectedIdealFor.length === 0) {
      return products;
    }
    return products.filter((product) => {
      return selectedIdealFor.includes(product.idealFor);
    });
  }
  function filterSizes(products) {
    const selectedSizes = getSelectedFilters("sizes");
    if (selectedSizes.length === 0) {
      return products;
    }
    return products.filter((product) => {
      return selectedSizes.includes(product.size);
    });
  }

  function sort(products) {
    if (!userFilterPref.sort) return products;
    products.sort((a, b) => {
      return userFilterPref.sort === "HIGH_TO_LOW"
        ? a.price > b.price
          ? -1
          : 1
        : a.price > b.price
        ? 1
        : -1;
    });
    return products;
  }

  function pipe(...fns) {
    return function (arg) {
      return fns.reduce((prevResult, fn) => {
        return fn(prevResult);
      }, arg);
    };
  }

  function getSelectedFilters(filterType) {
    return userFilterPref[filterType].reduce((acc, filter) => {
      if (filter.isSelected) {
        acc.push(filter.name);
      }
      return acc;
    }, []);
  }

  let productsToDisplay = pipe(
    filterBrands,
    filterIdealFor,
    filterSizes,
    sort
  )(products);

  return (
    <div className="product-list-container">
      {productsToDisplay.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </div>
  );
}
