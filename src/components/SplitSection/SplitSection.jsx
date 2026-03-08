import React from 'react';
import './SplitSection.css';

const SplitSection = ({ image, heading, subtext, children, imagePosition = 'left' }) => {
  const isImageLeft = imagePosition === 'left';

  return (
    <div className="split-section">
      {isImageLeft && (
        <div className="split-section-image">
          <img src={image} alt="section visual" />
        </div>
      )}
      <div className="split-section-text">
        <h1>{heading}</h1>
        <p>{subtext}</p>
        {children}
      </div>
      {!isImageLeft && (
        <div className="split-section-image">
          <img src={image} alt="section visual" />
        </div>
      )}
    </div>
  );
};

export default SplitSection;


