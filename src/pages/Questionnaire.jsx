import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Questionnaire.css";

const Questionnaire = () => {
  const { lang } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 页面进入时的淡入动画
    setTimeout(() => {
      setIsLoaded(true);
    }, 50);
  }, []);

  const formUrl =
    lang === "en"
      ? "https://docs.google.com/forms/d/e/1FAIpQLSf7bVlCXoIRK3p97HmOV0lasu3rMvOx4eeFErjVC9hyEahwXQ/viewform?embedded=true"
      : "https://docs.google.com/forms/d/e/1FAIpQLScKgwJT5Ni7BivMZ_I6j71_4XTpsvYDGFjpf5BLdi5fazmuLQ/viewform?embedded=true";

  return (
    <div className={`questionnaire-page ${isLoaded ? "page-fade-in" : ""}`}>
      <Layout />
      
      <div className="questionnaire-content">
        <div className="questionnaire-container">
          <iframe
            src={formUrl}
            width="100%"
            height="1500"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Buyer Questionnaire"
            className="questionnaire-iframe"
          >
            Loading…
          </iframe>
        </div>
      </div>

      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
};

export default Questionnaire;