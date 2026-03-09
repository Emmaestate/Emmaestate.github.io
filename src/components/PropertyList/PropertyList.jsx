// src/Components/PropertyList/PropertyList.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyList.css";

const PropertyList = ({ properties = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  const navigate = useNavigate();
  const listRef = useRef(null);

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Create an array of empty slots if currentProperties is less than propertiesPerPage
  const emptySlots = Array.from({
    length: propertiesPerPage - currentProperties.length,
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="property-list-container" ref={listRef}>
      <div className="property-grid fade-in" key={currentPage}>
        {currentProperties.map((property) => (
          <div
            key={property.id}
            className="property-card"
            onClick={() => handleClick(property.id)}
          >
            <div className="property-image-container">
              <img
                src={property.image}
                alt={property.address}
                className="property-image"
              />
            </div>
            <div className="property-details">
              <p className="property-address">{property.address}</p>
              <p className="property-price">
                ${property.price.toLocaleString()}
              </p>
              <p className="property-info">
                {property.bedrooms} Beds | {property.bathrooms} Baths |{" "}
                {property.sqft} sqft
              </p>
            </div>
          </div>
        ))}
        {emptySlots.map((_, index) => (
          <div
            key={`empty-${index}`}
            className="property-card"
            style={{ visibility: "hidden", pointerEvents: "none" }}
          >
            {/* Render an invisible structure to maintain layout height */}
            <div className="property-image-container"></div>
            <div className="property-details">
              <p className="property-address">&nbsp;</p>
              <p className="property-price">&nbsp;</p>
              <p className="property-info">&nbsp;</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx + 1}
            className={`pagination-btn ${currentPage === idx + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
