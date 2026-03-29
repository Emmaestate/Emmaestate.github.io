import React, { useState, useEffect } from "react";
import "./ContactFormPopup.css";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

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

  const formUrl =
    lang === "en"
      ? "https://docs.google.com/forms/d/e/1FAIpQLSf7bVlCXoIRK3p97HmOV0lasu3rMvOx4eeFErjVC9hyEahwXQ/viewform?embedded=true"
      : "https://docs.google.com/forms/d/e/1FAIpQLScKgwJT5Ni7BivMZ_I6j71_4XTpsvYDGFjpf5BLdi5fazmuLQ/viewform?embedded=true";

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

            <div className="lang-switch">
              <button
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                English
              </button>
              <button
                className={`lang-btn ${lang === "zh" ? "active" : ""}`}
                onClick={() => setLang("zh")}
              >
                中文
              </button>
            </div>

            <div className="iframe-container">
              <iframe
                src={formUrl}
                width="640"
                height="800"
                frameBorder="0"
                marginHeight="0"
                marginWidth="0"
                title="Buyer Questionnaire"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
