import React, { useState } from 'react';
import './Hero.css';

const Hero = ({
  subtitle = '',
  title = '',
  description = '',
  btnText = '',
  backgroundImage = '/assets/hero.jpg',
  height = '700px',
  paddingTop = '80px',
  showButton= true,
}) => {
  const [hovered, setHovered] = useState(false);

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(175,175,175,0.69), rgba(0,0,0,0.7)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height,
    paddingTop,
  };

  return (
    <div className="hero-wrapper">
      <div className="hero" style={heroStyle}>
        <div className="hero-text">
          <p className="subtitle">{subtitle}</p>
          <h1 className="title1" style={{ fontSize: '85px' }}>{title}</h1>
          <p className="description">{description}</p>
          {showButton && (
          <button
            className="btn5"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {btnText} {hovered && <span>&nbsp;&#8640;</span>}
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
