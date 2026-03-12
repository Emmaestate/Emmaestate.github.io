import React from "react";
import x_icon from "../../assets/X.png";
import emma_image from "../../assets/emma.jpeg";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import facebook_icon from "../../assets/facebook.png";
import ContactFormPopup from "../ContactFormPopup/ContactFormPopup.jsx";
import "./AgentProfile2.css";

const AgentProfile2 = () => {
  return (
    <div className="communities-container">
      <div className="agent-profile">
        {/* Agent Image */}
        <div className="agent-profile__image">
          <img className="agent-image" src={emma_image} alt="Meet Emma" />
        </div>

        {/* Agent Content */}
        <div className="agent-profile__content">
          <div>
            <h2 className="agent-name">Emma Ju</h2>
            <p className="agent-position">Luxury Real Estate Agent</p>

            <div className="agent-contact">
              {/* Row 1: Two columns side by side */}
              <div className="contact-row contact-row--split">
                <div className="split-item">
                  <div className="contact-item">
                    <p className="contact-title">Primary phone</p>
                    <a
                      className="agent-link"
                      href="tel:(518) 578-1104"
                      aria-label="call (518) 578-1104"
                    >
                      (123) 456-7890
                    </a>
                  </div>
                  <div className="contact-item">
                    <p className="contact-title">License Number</p>
                    #12345678
                  </div>
                </div>
              </div>

              {/* Row 2: Full width */}
              <div className="contact-row">
                <p className="contact-title">Email</p>
                <a className="agent-link" href="mailto:realtorlzj@gmail.com">
                  realtorlzj@gmail.com
                </a>
              </div>

              {/* Row 3: Full width */}
              <div className="contact-row">
                <p className="contact-title">Address</p>
                2160 N Central Rd #111, <br />
                Fort Lee, <br />
                NJ 07024
              </div>
            </div>
          </div>

          {/* Footer: Social Icons + CTA */}
          <div className="content-footer">
            <ul className="lp-socials">
              <li style={{ display: "none" }}>
                <a
                  href="#"
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
                  href="#"
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

            <div className="cta">
              <ContactFormPopup
                customButton={
                  <a
                    className="lp-link lp-link--dark"
                    style={{ cursor: "pointer" }}
                  >
                    Connect with Emma
                  </a>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile2;
