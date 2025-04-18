import React from "react";
import "./SkeletonLoader.css"; // Import CSS for styling

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="skeleton-row">
          <div className="skeleton-box skeleton-image"></div>
          <div className="skeleton-box skeleton-text"></div>
          <div className="skeleton-box skeleton-text"></div>
          <div className="skeleton-box skeleton-text"></div>
          <div className="skeleton-box skeleton-text"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
