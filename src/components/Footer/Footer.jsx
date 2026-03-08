import React from 'react';
import './Footer.css';
import x_icon from '../../assets/X.png';
import instagram_icon from '../../assets/instagram.png';
import wechat_icon from '../../assets/wechat.png';
import youtube_icon from '../../assets/youtube.png';
import facebook_icon from '../../assets/facebook.png';

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
                <h3><b>Acre NJ Real Estate</b></h3>
                Lizhen(Emma) Ju | NJ RE#12345678 <br />
                Jeff Vasquez | NJ RE#2331270
              </div>
              <div className="company-location">
                <h3><b>Location</b></h3>
                2160 N Central Rd #111 <br />
                Fort Lee, NJ 07024
              </div>
            </div>

            {/* Right block with Contact */}
            <div className="company-contact">
              <h3><b>Contact Us</b></h3>
              <a href="mailto:emmaju@acreny.us">emmaju@acreny.us</a><br />
              <a href="tel:2017421625">(201)-742-1625</a>
            </div>
          </div>
        </div>

        <div className="footer-layout-right">
          <div className="newsletter">
            <div className="newsletter-info">
              <h1>NEWSLETTER</h1>
              <h3 className="pre-wrap">
                Subscribe to our Newsletter for latest news and updates. Stay tuned!
              </h3>

              <form className="newsletter__subscribe" data-type="contact-form">
                <div className="h-pot">
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    id="middleName"
                    name="middleName"
                    autoComplete="off"
                    tabIndex="-1"
                    aria-label="Middle Name"
                  />
                </div>

                <input type="hidden" name="source" value="NEWSLETTER_SIGNUP" />
                <input
                  required
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  aria-required="true"
                  aria-label="Email Address"
                />

                <div className="lp-disclaimer">
                  <label className="lp-tcr-content">
                    <span className="lp-tcr-checkbox">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        required
                        onInvalid={(e) => e.target.setCustomValidity('Please accept the terms and conditions')}
                        onInput={(e) => e.target.setCustomValidity('')}
                      />
                    </span>
                    <span className="lp-tcr-message">
                      By providing your contact information to <strong>Emma Ju Estate</strong>, you acknowledge and agree to our{' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                        Privacy Policy
                      </a>{' '}
                      and consent to receiving marketing communications, including through automated calls, texts, and emails, some of which may use artificial or prerecorded voices. This consent is not required to purchase any products or services, and you may opt out at any time. To opt out of texts, reply "STOP" at any time. To opt out of emails, click the unsubscribe link included in our emails. Message and data rates may apply.
                    </span>
                  </label>
                </div>

                <br />
                <input type="submit" value="SUBSCRIBE" className="btn btn--subscribe" />
                <p className="success hide">Email Submitted!</p>
              </form>
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
            <li>
              <a href="" className="lp-socials__link socials__item" target="_blank" rel="noopener noreferrer" aria-label="X">
                <div className="icon-wrapper">
                  <img src={x_icon} alt="X" />
                </div>
              </a>
            </li>
            <li>
              <a href="" className="lp-socials__link socials__item" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <div className="icon-wrapper">
                  <img src={instagram_icon} alt="Instagram" />
                </div>
              </a>
            </li>
            <li>
              <a href="" className="lp-socials__link socials__item" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <div className="icon-wrapper">
                  <img src={facebook_icon} alt="Facebook" />
                </div>
              </a>
            </li>
            <li>
              <a href="" className="lp-socials__link socials__item" target="_blank" rel="noopener noreferrer" aria-label="WeChat">
                <div className="icon-wrapper">
                  <img src={wechat_icon} alt="WeChat" />
                </div>
              </a>
            </li>
            <li>
              <a href="" className="lp-socials__link socials__item" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
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
          <p>© Copyright 2025  |  Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
