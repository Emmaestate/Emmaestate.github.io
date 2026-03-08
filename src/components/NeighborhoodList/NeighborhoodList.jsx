// src/Components/NeighborhoodList/NeighborhoodList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NeighborhoodList.css';

const NeighborhoodList = ({ neighborhoods = [] }) => {
  return (
    <div className="neighborhood-list-container">
      <div className="neighborhood-grid">
        {neighborhoods.map((neighborhood) => {
          const slug = neighborhood.name.toLowerCase().replace(/\s+/g, '-');

          return (
            <Link 
              to={`/neighborhoods/${neighborhood.path}`} 
              className="neighborhood-card-link">

              <div className="neighborhood-card">
                <div className="neighborhood-image-container">
                  <img
                    src={neighborhood.image}
                    alt={neighborhood.name}
                    className="neighborhood-image"
                  />
                </div>
                <div className="neighborhood-details">
                  <h3 className="neighborhood-address">{neighborhood.name}</h3>
                  <p className="neighborhood-info">{neighborhood.description}</p>
                </div>
              </div>
              
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NeighborhoodList;
