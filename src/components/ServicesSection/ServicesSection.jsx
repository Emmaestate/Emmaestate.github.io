import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesSection.css";
import buyImg from "../../assets/Buy.jpg";
import sellImg from "../../assets/Sell.jpg";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import homeConfig from "../../config/pages/Home.config.js";

const ServicesSection = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  // Intersection Observer for fade-in animation
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    const sections = document.querySelectorAll(".service-block");
    sections.forEach((section) => {
      if (observerRef.current) observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return (
    <section className="services-section">
      {/* BUY SECTION */}
      <div className="service-block">
        <div className="service-image-container">
          <div className="service-image-wrapper">
            <img
              src={buyImg}
              alt="Luxury Home Buying"
              className="service-image"
            />
          </div>
        </div>
        <div className="service-content">
          <h2 className="service-title">
            {homeConfig.services.buy.title[lang]}
          </h2>
          <h3 className="service-subtitle">
            {homeConfig.services.buy.subtitle[lang]}
          </h3>
          <p className="service-description">
            {homeConfig.services.buy.description[lang]}
          </p>
          <button
            className="service-btn"
            onClick={() => navigate("/properties/exclusivelist")}
          >
            {homeConfig.services.buy.btn[lang]}
          </button>
        </div>
      </div>

      {/* SELL SECTION */}
      <div className="service-block reverse">
        <div className="service-image-container">
          <div className="service-image-wrapper">
            <img
              src={sellImg}
              alt="Selling Your Property"
              className="service-image"
            />
          </div>
        </div>
        <div className="service-content">
          <h2 className="service-title">
            {homeConfig.services.sell.title[lang]}
          </h2>
          <h3 className="service-subtitle">
            {homeConfig.services.sell.subtitle[lang]}
          </h3>
          <p className="service-description">
            {homeConfig.services.sell.description[lang]}
          </p>
          <button
            className="service-btn"
            onClick={() => navigate("/properties/soldlist")}
          >
            {homeConfig.services.sell.btn[lang]}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
