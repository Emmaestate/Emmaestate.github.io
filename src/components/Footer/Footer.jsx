import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import facebook_icon from "../../assets/facebook.png";
import companyLogo from "../../assets/company_b.png";
import footer_logo from "../../assets/footer-logo_b.png";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import footerConfig from "../../config/pages/Footer.config.js";

const Footer = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  return (
    <div className="global-footer">
      <div className="footer-content-wrapper">
        <div className="footer-top-row">
          <div className="footer-brand-title">EMMA JU ESTATES</div>
        </div>

        <div className="footer-middle-row">
          {/* Column 1: Specialization & Logos & Socials */}
          <div className="footer-col footer-col-left">
            <h4 className="footer-col-title-left">{footerConfig.left.specialization[lang]}</h4>
            
            <div className="footer-logos">
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
              <span className="logo-divider"></span>
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
            </div>

            <div className="container-social-media">
              <ul>
                <li>
                  <a
                    href="https://www.instagram.com/emmarocks_nyc?igsh=cWhrdndsMmp2OHVn&utm_source=qr"
                    className="lp-socials__link socials__item"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <img src={instagram_icon} alt="Instagram" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@emmaju1124?si=_26WGzY3BKVt_IJv"
                    className="lp-socials__link socials__item"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <img src={youtube_icon} alt="YouTube" />
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
                      <img src={facebook_icon} alt="Facebook" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="footer-copyright">Copyright © 2026 Emma Ju Estates - All Rights Reserved.</div>
          </div>

          {/* Column 2: Location */}
          <div className="footer-col footer-col-location">
            <h4 className="footer-col-title">{footerConfig.left.locationTitle[lang]}</h4>
            <div className="footer-location-item">
              <span className="location-dot">• </span>
              <div className="location-text">
                <span className="location-label">{footerConfig.left.njLabel[lang]}</span>
                <p>
                  {footerConfig.left.njAddr1[lang]} {footerConfig.left.njAddr2[lang]}
                </p>
              </div>
            </div>
            <div className="footer-location-item" style={{ marginTop: '1.5rem' }}>
              <span className="location-dot">• </span>
              <div className="location-text">
                <span className="location-label">{footerConfig.left.nyLabel[lang]}</span>
                <p>
                  {footerConfig.left.nyAddr1[lang]}, {footerConfig.left.nyAddr2[lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">{footerConfig.contactTitle[lang]}</h4>
            <div className="footer-contact-item">
              <span className="contact-icon">✉️</span>
              <a href="mailto:emma@acrenj.us" className="footer-contact-link">
                emma@acrenj.us
              </a>
            </div>
            <div className="footer-contact-item">
              <span className="contact-icon">📞</span>
              <a href="tel:2017421625" className="footer-contact-link">
                201-742-1625
              </a>
            </div>
          </div>

          {/* Column 4: Leave A Message */}
          <div className="footer-col footer-col-message">
            <h4 className="footer-col-title">{footerConfig.title[lang]}</h4>
            <p className="footer-cta-desc">
              Interested in buying or selling?<br/>Let's connect and find your perfect solution.
            </p>
            <button
              className="footer-cta-btn"
              onClick={() => navigate("/contact")}
            >
              LET'S CONNECT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
