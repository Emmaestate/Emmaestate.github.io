import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesSection.css";
import buyImg from "../../assets/Buy.jpg";
import sellImg from "../../assets/Sell.jpg";

const ServicesSection = () => {
  const navigate = useNavigate();

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
          <h2 className="service-title">ACQUIRE</h2>
          <h3 className="service-subtitle">Find Your Dream Home</h3>
          <p className="service-description">
            Discover exclusive properties and personalized buying experiences
            tailored to your lifestyle in Manhattan, Fort Lee, Edgewater and
            Bergen county. We guide you through every step of finding a home
            that truly reflects who you are.
          </p>
          <button
            className="service-btn"
            onClick={() => navigate("/properties/exclusivelist")}
          >
            Explore Listings
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
          <h2 className="service-title">CURATE</h2>
          <h3 className="service-subtitle">Selling With Confidence</h3>
          <p className="service-description">
            Maximize your property's value with our strategic marketing and
            expert negotiation skills. From staging to closing, we handle the
            details with precision so you can move forward with peace of mind.
          </p>
          <button
            className="service-btn"
            onClick={() => navigate("/properties/soldlist")}
          >
            Request Valuation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
