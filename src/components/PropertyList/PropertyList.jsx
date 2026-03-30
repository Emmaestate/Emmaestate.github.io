// src/Components/PropertyList/PropertyList.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyList.css";
import ContactForm from "../ContactForm/ContactForm";

import { useLanguage } from "../../i18n/LanguageContext.jsx";

const PropertyList = ({ properties = [] }) => {
  const { lang } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [gridHeight, setGridHeight] = useState("auto"); // Initialize with auto
  const propertiesPerPage = 6;
  const navigate = useNavigate();
  const listRef = useRef(null);
  const gridRef = useRef(null); // Ref for the grid container

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Measure height when properties change
  useEffect(() => {
    if (gridRef.current) {
      // Temporarily set height to auto to measure content
      // But since we are rendering new content, React will do it.
      // We need to capture the height after render.
      // A simple way is to use a ResizeObserver or just measure after render.

      const height = gridRef.current.scrollHeight;
      setGridHeight(`${height}px`);
    }
  }, [currentProperties]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (id) => {
    navigate(`/property/${id}`);
    // setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="property-list-container" ref={listRef}>
      <div
        className="property-grid-wrapper"
        style={{
          height: gridHeight,
          minHeight: "200px", // Prevent collapse to 0
          transition: "height 0.4s ease-out",
          overflow: "hidden",
        }}
      >
        <div className="property-grid fade-in" key={currentPage} ref={gridRef}>
          {currentProperties.map((property) => (
            <div
              key={property.id}
              className="property-card"
              onClick={() => handleClick(property.id)}
            >
              <div className="property-image-container" style={{ backgroundColor: "#e0e0e0" }}>
                <img
                  src={property.image}
                  alt={property.address}
                  className="property-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="property-details">
                <p className="property-address">{property.address}</p>
                <p className="property-price">
                  ${property.price.toLocaleString()}
                </p>
                <p className="property-info">
                  {property.bedrooms} {lang === "zh" ? "卧室" : "Beds"} |{" "}
                  {property.bathrooms} {lang === "zh" ? "卫生间" : "Baths"}
                  {property.sqft && property.sqft !== "N/A"
                    ? ` | ${property.sqft} ${lang === "zh" ? "平方英尺" : "sqft"}`
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
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

      {isPopupOpen && (
        <div
          id="contact-popup"
          className="pop-up"
          style={{
            "--backgroundColor": "rgba(20, 20, 20, 1)",
            "--textColor": "rgba(255, 255, 255, 1)",
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="lp-container">
            <ContactForm />

            <button
              type="button"
              className="close-btn lp-ico lp-ico-close"
              aria-label="Close this option"
              onClick={closePopup}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
