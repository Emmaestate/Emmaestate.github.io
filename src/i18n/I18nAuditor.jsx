import React, { useEffect } from "react";
import { useLanguage } from "./LanguageContext.jsx";

const Auditor = () => {
  const { lang } = useLanguage();
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("body *")).filter(
      (el) => el.childNodes && Array.from(el.childNodes).some((n) => n.nodeType === 3)
    );
    nodes.forEach((el) => el.classList.remove("i18n-audit"));
    if (lang === "zh") {
      nodes.forEach((el) => {
        const text = el.innerText || "";
        if (/[A-Za-z]{3,}/.test(text) && !el.closest(".code,pre")) {
          el.classList.add("i18n-audit");
        }
      });
    }
  }, [lang]);
  return null;
};

export default Auditor;
