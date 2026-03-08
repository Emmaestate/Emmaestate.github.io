import React, { useState } from 'react';
import styles from './Hero2.module.css'; // ✅ Correct CSS module import

const Hero2 = ({
  subtitle = '',
  title = '',
  description = '',
  btnText = '',
  backgroundImage = '/assets/hero.jpg',
  height = '700px',
  paddingTop = '80px',
  showButton = true,
}) => {
  const [hovered, setHovered] = useState(false);

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.17), rgba(110, 110, 110, 0.23)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // or remove completely and use CSS
  };

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.hero} style={heroStyle}>
        <div className={styles.heroText}>
          <p className={styles.subtitle}>{subtitle}</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          {showButton && (
            <button
              className={styles.btn}
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

export default Hero2;
