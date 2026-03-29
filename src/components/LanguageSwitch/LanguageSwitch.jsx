import React from "react";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const LanguageSwitch = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <button
        onClick={() => setLang("en")}
        style={{
          padding: "6px 10px",
          borderRadius: "14px",
          border: "1px solid #888",
          background: lang === "en" ? "#fff" : "transparent",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLang("zh")}
        style={{
          padding: "6px 10px",
          borderRadius: "14px",
          border: "1px solid #888",
          background: lang === "zh" ? "#fff" : "transparent",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSwitch;
