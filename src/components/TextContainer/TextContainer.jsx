// src/Components/TextContainer/TextContainer.jsx
import React from 'react';
import './TextContainer.css';

function TextContainer({ title, text }) {
  return (
    <div className="text-container">
      <h1 className="text-container-title">{title}</h1>
      <p className="text-container-text">{text}</p>
    </div>
  );
}

export default TextContainer;
