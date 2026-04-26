import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import x_icon from "../../assets/X.png";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import facebook_icon from "../../assets/facebook.png";
import companyLogo from "../../assets/company.jpeg";
import footer_logo from "../../assets/footer-logo.jpeg";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import footerConfig from "../../config/pages/Footer.config.js";

const Footer = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  return (
    <div className="global-footer">
      <div className="footer-top-row">
        {/* Left Column: Brand & Specialization */}
        <div className="footer-col footer-col-brand">
          <h2 className="footer-brand-title">EMMA JU ESTATES</h2>
          <div className="footer-specialization">
            <h4>{footerConfig.left.specialization[lang]}</h4>
            <p>{footerConfig.left.name[lang]}</p>
          </div>
        </div>

        {/* Middle Column: Locations */}
        <div className="footer-col footer-col-locations">
          <h4 className="footer-col-title">
            {footerConfig.left.locationTitle[lang]}
          </h4>
          <div className="footer-location-item">
            <span className="location-label">
              {footerConfig.left.njLabel[lang]}
            </span>
            <p>
              {footerConfig.left.njAddr1[lang]}
              <br />
              {footerConfig.left.njAddr2[lang]}
            </p>
          </div>
          <div className="footer-location-item">
            <span className="location-label">
              {footerConfig.left.nyLabel[lang]}
            </span>
            <p>
              {footerConfig.left.nyAddr1[lang]}
              <br />
              {footerConfig.left.nyAddr2[lang]}
            </p>
          </div>
        </div>

        {/* Right Column 1: Contact Info */}
        <div className="footer-col footer-col-contact">
          <h4 className="footer-col-title">
            {footerConfig.contactTitle[lang]}
          </h4>
          <a href="mailto:emma@acrenj.us" className="footer-contact-link">
            emma@acrenj.us
          </a>
          <a href="tel:2017421625" className="footer-contact-link">
            (201)-742-1625
          </a>
        </div>

        {/* Right Column 2: Call to Action */}
        <div className="footer-col footer-col-cta">
          <h4 className="footer-col-title">{footerConfig.title[lang]}</h4>
          <p className="footer-cta-desc">{footerConfig.description[lang]}</p>
          <button
            className="footer-cta-btn"
            onClick={() => navigate("/contact")}
          >
            {footerConfig.links.contact[lang]}
          </button>
        </div>
      </div>

      {/* Navigation Links + Social Icons on the same row */}
      <div className="footer-bottom-row">
        <div className="footer-links"></div>

        <div className="container-social-media">
          <ul>
            <li style={{ display: "none" }}>
              <a
                href=""
                className="lp-socials__link socials__item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <div className="icon-wrapper">
                  <img src={x_icon} alt="X" />
                </div>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/emmarocks_nyc?igsh=cWhrdndsMmp2OHVn&utm_source=qr"
                className="lp-socials__link socials__item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <div className="icon-wrapper">
                  <img src={instagram_icon} alt="Instagram" />
                </div>
              </a>
            </li>
            <li style={{ display: "none" }}>
              <a
                href=""
                className="lp-socials__link socials__item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <div className="icon-wrapper">
                  <img src={facebook_icon} alt="Facebook" />
                </div>
              </a>
            </li>
            <li>
              <div className="tooltip-container">
                <a
                  href="#"
                  className="lp-socials__link socials__item"
                  aria-label="WeChat"
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="icon-wrapper">
                    <img src={wechat_icon} alt="WeChat" />
                  </div>
                </a>
                <span className="tooltip-text">WeChat: emmarocks2</span>
              </div>
            </li>
            <li>
              <a
                href="https://youtube.com/@emmaju1124?si=_26WGzY3BKVt_IJv"
                className="lp-socials__link socials__item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <div className="icon-wrapper">
                  <img src={youtube_icon} alt="YouTube" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Label */}
      <div className="footer-label">
        <div className="footer-logos">
          <a
            href="https://www.acreny.us/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-logo-link"
          >
            <img
              src={companyLogo}
              alt="ACRE NY Realty"
              className="footer-company-logo"
            />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.scrollTo(0, 0);
            }}
            className="footer-logo-link"
          >
            <img
              src={footer_logo}
              alt="Emma Ju Estates"
              className="footer-website-logo"
            />
          </a>
        </div>
        <div>Copyright © 2025 Emma Ju Estates - All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
