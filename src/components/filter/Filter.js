import React from "react";
import "./filter.css";

export default function Filter({ userFilterPref, userFilterDispatch }) {
  return (
    <div className="product-filter-wrapper">
      <div className="filter-header">
        <span>
          <b>Filters</b>
        </span>{" "}
        <span
          className="clear-filter-btn"
          onClick={() => {
            userFilterDispatch({
              type: "CLEAR_FILTER"
            });
          }}
        >
          Clear All
        </span>
      </div>
      <ul>
        <p>
          <b>Brands</b>
        </p>
        {userFilterPref.brands.map((brand) => {
          return (
            <li key={brand.name} className="product-filter">
              <label>
                <input
                  type="checkbox"
                  checked={brand.isSelected}
                  onChange={() => {
                    userFilterDispatch({
                      type: "UPDATE_BRAND",
                      payload: {
                        brand: brand.name
                      }
                    });
                  }}
                />
                {brand.name}
              </label>
            </li>
          );
        })}
        <p>
          <b>Ideal For</b>
        </p>
        {userFilterPref.idealFor.map((idealFor) => {
          return (
            <li key={idealFor.name} className="product-filter">
              <label>
                <input
                  type="checkbox"
                  checked={idealFor.isSelected}
                  onChange={() => {
                    userFilterDispatch({
                      type: "UPDATE_IDEAL_FOR",
                      payload: {
                        idealFor: idealFor.name
                      }
                    });
                  }}
                />
                {idealFor.name}
              </label>
            </li>
          );
        })}
        <p>
          <b>Size</b>
        </p>
        {userFilterPref.sizes.map((size) => {
          return (
            <li key={size.name} className="product-filter">
              <label>
                <input
                  type="checkbox"
                  checked={size.isSelected}
                  onChange={() => {
                    userFilterDispatch({
                      type: "UPDATE_SIZE",
                      payload: {
                        size: size.name
                      }
                    });
                  }}
                />
                {size.name}
              </label>
            </li>
          );
        })}
     

        <p>
          <b>Sort</b>
        </p>
        <li className="product-filter">
          <label>
            <input
              type="radio"
              checked={userFilterPref.sort === "HIGH_TO_LOW"}
              onChange={() => {
                userFilterDispatch({
                  type: "TOGGLE_SORT",
                  payload: { sortType: "DESC" }
                });
              }}
            />
            Price - High to Low
          </label>
        </li>
        <li className="product-filter">
          <label>
            <input
              type="radio"
              checked={userFilterPref.sort === "LOW_TO_HIGH"}
              onChange={() => [
                userFilterDispatch({
                  type: "TOGGLE_SORT",
                  payload: { sortType: "ASC" }
                })
              ]}
            />
            Price - Low to High
          </label>
        </li>
      </ul>
    </div>
  );
}
