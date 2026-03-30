// AgentProfile.jsx
import React from "react";
import emma_image from "../../assets/emma.jpeg";
import x_icon from "../../assets/X.png";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import facebook_icon from "../../assets/facebook.png";
import "./AgentProfile.css";

const AgentProfile = ({
  title = "Meet Emma Ju",
  position = "Real estate specialist in Manhattan and the NJ gold coast",
  paragraphs = [
    "Emma Ju is a real estate professional with Acre NY Realty and Acre NJ. With deep market knowledge and a reputation for trust and professionalism, she helps clients navigate both city and suburban transactions with ease.",
    "Fluent in English and Mandarin, Emma works with a diverse range of buyers, sellers, and investors. Her client-first approach, clear communication, and dedication to long-term relationships make her a trusted guide in today’s competitive real estate market.",
  ],
  ctaText = "Learn More",
}) => {
  return (
    <div className="communities-container">
      <div className="agent-profile">
        <div className="agent-profile__image">
          <img className="agent-image" src={emma_image} alt="Meet Emma" />
        </div>
        <div className="agent-profile__content">
          <h2 className="agent-name">{title}</h2>
          <p className="agent-position">{position}</p>
          <div className="agent-description">
            {paragraphs.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>

          <div className="content-footer">
            <ul className="lp-socials">
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
            <div className="cta">
              <a href="#/about" className="lp-link lp-link--dark">
                {ctaText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
