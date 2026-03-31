import React, { useState, useEffect } from "react";
import "./ContactFormPopup.css";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import ContactForm from "../ContactForm/ContactForm.jsx";

export default function ContactFormPopup({ customButton }) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang: globalLang } = useLanguage();
  const [lang, setLang] = useState(globalLang); // 'en' or 'zh'
  useEffect(() => {
    setLang(globalLang);
  }, [globalLang, isOpen]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {customButton ? (
        React.cloneElement(customButton, { onClick: togglePopup })
      ) : (
        <button
          className={`connect-btn ${!isOpen ? "glowing" : ""}`}
          onClick={togglePopup}
          aria-expanded={isOpen}
          aria-controls="contact-popup"
        >
          {globalLang === "zh" ? "联系我们" : "LET'S CONNECT!"}
        </button>
      )}

      {isOpen && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div
            id="contact-popup"
            className="popup-content"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-btn"
              aria-label="Close"
              onClick={togglePopup}
            >
              ✕
            </button>

            <div className="form-container">
              <ContactForm className="popup-form" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
