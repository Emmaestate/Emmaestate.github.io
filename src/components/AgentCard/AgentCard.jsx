import React from 'react';
import './AgentCard.css';

const AgentCard = ({ image, name, label }) => {
  return (
    <div className="agent-card">
      <img src={image} alt={name} className="agent-image" />
      <h3 className="agent-card-name">{name}</h3>
      <p className="agent-label">{label}</p>
    </div>
  );
};

export default AgentCard;
