import React from 'react';
import './WelcomeStats.css';

const WelcomeStats = ({
  state = '',
  town = '',
  totalPopulation = 0,
  medianAge = '',
  populationDensity = '',
  averageIncome = ''
}) => {
  return (
    <section className="welcome-stats-section">
      <div className="welcome-container">
        <h2 className="welcome-title">Welcome to {town}, {state}</h2>
        <p className="welcome-description">
          {totalPopulation?.toLocaleString()} people live in {town}, where the median age is {medianAge}
          and the average individual income is ${averageIncome?.toLocaleString()}.<br />
          Data provided by the U.S. Census Bureau.
        </p>

        <div className="items">
          <div className="item">
            <div className="item__icon item__icon-population"></div>
            <div className="item__copy">
              <h5 className="item__value">{totalPopulation?.toLocaleString()}</h5>
              <p className="item__name">Total Population</p>
            </div>
          </div>
          <div className="item">
            <div className="item__icon item__icon-age"></div>
            <div className="item__copy">
              <h5 className="item__value">{medianAge} years</h5>
              <p className="item__name">Median Age</p>
            </div>
          </div>
          <div className="item">
            <div className="item__icon item__icon-density"></div>
            <div className="item__copy">
              <h5 className="item__value">{populationDensity}</h5>
              <p className="item__name item__name--hint">
                Population Density
                <span className="item__hint">
                  <span><strong>Population Density:</strong></span>
                  <span>This is the number of people per square mile in a neighborhood.</span>
                </span>
              </p>
            </div>
          </div>
          <div className="item">
            <div className="item__icon item__icon-income"></div>
            <div className="item__copy">
              <h5 className="item__value">${averageIncome?.toLocaleString()}</h5>
              <p className="item__name">Average Individual Income</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeStats;
