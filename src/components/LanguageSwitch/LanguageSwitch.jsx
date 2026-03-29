import React from "react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const LanguageSwitch = () => {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "zh" : "en")}
      style={{
        padding: "6px 10px",
        borderRadius: "14px",
        border: "1px solid #888",
        background: "#fff",
        color: "#000",
        cursor: "pointer",
      }}
      aria-label="Toggle language"
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
};

export default LanguageSwitch;
