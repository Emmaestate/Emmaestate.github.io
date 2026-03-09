import React, { useState, useEffect } from 'react';
import './ScrollDownButton.css';

const ScrollDownButton = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide button when scrolled past the first screen height
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button 
      className="scroll-down-btn" 
      onClick={handleScrollDown}
      aria-label="Scroll down"
    >
      &#8964;
    </button>
  );
};

export default ScrollDownButton;
