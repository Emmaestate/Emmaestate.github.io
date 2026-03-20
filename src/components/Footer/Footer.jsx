import React from "react";
import "./Footer.css";
import ContactFormPopup from "../ContactFormPopup/ContactFormPopup";
import x_icon from "../../assets/X.png";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import facebook_icon from "../../assets/facebook.png";

const Footer = () => {
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
                  <b>Specializing in Luxury Real Estate</b>
                </h3>
                Lizhen(Emma) Ju
              </div>
              <div className="company-location">
                <h3>
                  <b>Location</b>
                </h3>
                <span style={{ color: "#aaa" }}>NJ OFFICE:</span> 2160 N Central
                Rd #111
                <br />
                Fort Lee, NJ 07024
                <br />
                <span style={{ color: "#aaa" }}>NY OFFICE:</span> 45-10 Court
                Square FL 1, <br />
                Long Island City, New York, 11101
              </div>
            </div>

            {/* Right block with Contact */}
            <div className="company-contact">
              <h3>
                <b>Contact Us</b>
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
                Leave a Message
              </h3>
              <p
                style={{
                  marginBottom: "20px",
                  color: "#333",
                  lineHeight: "1.6",
                }}
              >
                Interested in buying or selling? Let's connect and find your
                perfect solution.
              </p>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <ContactFormPopup
                  customButton={
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
                    >
                      LET'S CONNECT
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links + Social Icons on the same row */}
      <div className="footer-bottom-row">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/emma">Emma</a>
          <a href="/featured-listings">Featured Listings</a>
          <a href="/valuation">Home Valuation</a>
          <a href="/contact">Let's Connect</a>
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

      <div className="footer-label" style={{ justifyContent: "center" }}>
        <div>
          <p>© Copyright 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
