import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import x_icon from "../../assets/X.png";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import facebook_icon from "../../assets/facebook.png";
import companyLogo from "../../assets/company.jpeg";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import footerConfig from "../../config/pages/Footer.config.js";

const Footer = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  return (
    <div className="global-footer">
      <div className="footer-top-row">
        <div className="footer-layout-left">
          <div className="company-info-newsletter">
            <h1>EMMA JU ESTATE</h1>
          </div>

          <div className="company-contacts">
            {/* Left block with Acre NJ and Location */}
            <div className="company-left-group">
              <div className="company-acre">
                <h3>
                  <b>{footerConfig.left.specialization[lang]}</b>
                </h3>
                {footerConfig.left.name[lang]}
              </div>
              <div className="company-location">
                <h3>
                  <b>{footerConfig.left.locationTitle[lang]}</b>
                </h3>
                <span style={{ color: "#aaa" }}>{footerConfig.left.njLabel[lang]}</span> {footerConfig.left.njAddr1[lang]}
                <br />
                {footerConfig.left.njAddr2[lang]}
                <br />
                <span style={{ color: "#aaa" }}>{footerConfig.left.nyLabel[lang]}</span> {footerConfig.left.nyAddr1[lang]} <br />
                {footerConfig.left.nyAddr2[lang]}
              </div>
            </div>

            {/* Right block with Contact */}
            <div className="company-contact">
              <h3>
                <b>{footerConfig.contactTitle[lang]}</b>
              </h3>
              <a href="mailto:realtorlzj@gmail.com">realtorlzj@gmail.com</a>
              <br />
              <a href="tel:2017421625">(201)-742-1625</a>
            </div>
          </div>
        </div>

        <div className="footer-layout-right">
          <div className="newsletter">
            <div className="newsletter-info">
              <h3 style={{ marginBottom: "20px", color: "#000" }}>
                {footerConfig.title[lang]}
              </h3>
              <p
                style={{
                  marginBottom: "20px",
                  color: "#333",
                  lineHeight: "1.6",
                }}
              >
                {footerConfig.description[lang]}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <button
                  style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "background-color 0.3s",
                  }}
                  onClick={() => navigate("/contact")}
                >
                  {footerConfig.links.contact[lang]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links + Social Icons on the same row */}
      <div className="footer-bottom-row">
        <div className="footer-links">
          <a href="/">{footerConfig.links.home[lang]}</a>
          <a href="/about">{footerConfig.links.about[lang]}</a>
          <a href="/emma">{footerConfig.links.emma[lang]}</a>
          <a href="/featured-listings">{footerConfig.links.featured[lang]}</a>
          <a href="/valuation">{footerConfig.links.valuation[lang]}</a>
          <a href="/contact">{footerConfig.links.contact[lang]}</a>
        </div>

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

      <div className="footer-label">
        <div>
          <img
            src={companyLogo}
            alt="Company"
            className="footer-company-logo"
          />
        </div>
        <div>
          <p>© Copyright 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
