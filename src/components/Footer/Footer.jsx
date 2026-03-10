import React from "react";
import "./Footer.css";
import ContactForm from "../ContactForm/ContactForm";
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
                  <b>Acre NJ Real Estate</b>
                </h3>
                Lizhen(Emma) Ju | NJ RE#12345678 <br />
                Jeff Vasquez | NJ RE#2331270
              </div>
              <div className="company-location">
                <h3>
                  <b>Location</b>
                </h3>
                2160 N Central Rd #111 <br />
                Fort Lee, NJ 07024
              </div>
            </div>

            {/* Right block with Contact */}
            <div className="company-contact">
              <h3>
                <b>Contact Us</b>
              </h3>
              <a href="mailto:emmaju@acreny.us">emmaju@acreny.us</a>
              <br />
              <a href="tel:2017421625">(201)-742-1625</a>
            </div>
          </div>
        </div>

        <div className="footer-layout-right">
          <div className="newsletter">
            <div className="newsletter-info">
              <ContactForm />
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
          <a href="/#/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>

        <div className="container-social-media">
          <ul>
            <li>
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
                href=""
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
            <li>
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
              <a
                href=""
                className="lp-socials__link socials__item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WeChat"
              >
                <div className="icon-wrapper">
                  <img src={wechat_icon} alt="WeChat" />
                </div>
              </a>
            </li>
            <li>
              <a
                href=""
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
          <p>Website Designed and Developed by Jason He.</p>
        </div>
        <div>
          <p>© Copyright 2025 | Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
