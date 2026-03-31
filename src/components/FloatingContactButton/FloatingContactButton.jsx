import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import "./FloatingContactButton.css";

const FloatingContactButton = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <button
      className="floating-contact-btn"
      onClick={() => navigate("/contact")}
      aria-label={lang === "zh" ? "联系我们" : "LET'S CONNECT!"}
    >
      {lang === "zh" ? "联系我们" : "LET'S CONNECT!"}
    </button>
  );
};

export default FloatingContactButton;
