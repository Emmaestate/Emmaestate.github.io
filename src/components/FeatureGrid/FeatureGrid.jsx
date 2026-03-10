// FeatureGrid.jsx
import React from "react";
import "./FeatureGrid.css";

const FeatureGrid = ({ title, items, src }) => {
  return (
    <div className="feature-grid-container">
      {title && (
        <div className="feature-grid-header">
          <h1>{title}</h1>
        </div>
      )}

      <div className="feature-grid">
        {items.map((item, index) => (
          <div
            className="feature-card"
            key={index}
            onClick={() => (window.location.href = `#${item.src}`)}
          >
            {item.image && <img src={item.image} alt={`${item.title} image`} />}
            {/* Title overlay */}
            <div className="title">
              <h2>{item.title}</h2>
            </div>
            {/* Caption overlay (must be separate from title) */}
            {item.subtext && (
              <div className="caption">
                <p>{item.subtext}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length > 3 && <button className="btn2">View All</button>}
    </div>
  );
};

export default FeatureGrid;
