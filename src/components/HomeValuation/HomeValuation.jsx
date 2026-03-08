import React from 'react'
import placeHoldericon from '../../assets/placeholder.png'
import './HomeValuation.css'

const HomeValuation = () => {
  return (
    <div className="home-valuation-section">
      <div className="home-valuation-content-wrapper">
        <div className="home-valuation-title">
          <h2>HOW MUCH IS YOUR HOME WORTH?</h2>
        </div>

        <div className="search-wrapper">
          <div className="search-icon"> 
            <img src={placeHoldericon} alt="Search Icon" className="search-icon-img" />
          </div>
          <input
            type="text"
            placeholder="Enter your home address ..."
            className="search-input"
          />
          <button className="btn3">GET A FREE HOME VALUTATION</button>
        </div>
      </div>
    </div>
  );
};



export default HomeValuation
