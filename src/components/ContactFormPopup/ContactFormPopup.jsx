import React, { useState } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import './ContactFormPopup.css';

export default function ContactFormPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`connect-btn ${!isOpen ? 'glowing' : ''}`}
        onClick={togglePopup}
        aria-expanded={isOpen}
        aria-controls="contact-popup"
      >
        LET'S CONNECT!
      </button>

      {isOpen && (
        <div
          id="contact-popup"
          className="pop-up"
          style={{
            '--backgroundColor': 'rgba(20, 20, 20, 1)',
            '--textColor': 'rgba(255, 255, 255, 1)',
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="lp-container">
            <ContactForm />

            <button
              type="button"
              className="close-btn lp-ico lp-ico-close"
              aria-label="Close this option"
              onClick={togglePopup}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
