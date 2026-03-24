import React, { useState } from 'react';
import './AgentCard.css';

const AgentCard = ({ image, name, label, description, email, phone }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const MAX_LENGTH = 150; 
  const isLong = description && description.length > MAX_LENGTH;

  return (
    <div className="agent-card">
      <div className="agent-header">
        <img src={image} alt={name} className="agent-image" />
        <div className="agent-info">
          <h3 className="agent-card-name">{name}</h3>
          <p className="agent-label">{label}</p>
          
          {(email || phone) && (
            <div className="agent-contact">
              {email && <a href={`mailto:${email}`} className="agent-email">{email}</a>}
              {phone && <a href={`tel:${phone}`} className="agent-phone">{phone}</a>}
            </div>
          )}
        </div>
      </div>
      
      {description && (
        <div className="agent-description-container">
          <div className={`agent-description-wrapper ${isExpanded ? 'expanded' : ''}`}>
            <p>{description}</p>
          </div>
          {isLong && (
            <button 
              className="read-more-btn"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentCard;
