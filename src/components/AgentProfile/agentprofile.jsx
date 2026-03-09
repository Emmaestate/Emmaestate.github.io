// AgentProfile.jsx
import React from "react";
import x_icon from "../../assets/X.png";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import facebook_icon from "../../assets/facebook.png";
import "./AgentProfile.css";

const AgentProfile = () => {
  return (
    <div className="communities-container">
      <div className="agent-profile">
        <div className="agent-profile__image">
          <img
            className="agent-image"
            src="https://images.pexels.com/photos/7693223/pexels-photo-7693223.jpeg"
            alt="Meet Jessica"
          />
        </div>
        <div className="agent-profile__content">
          <h2 className="agent-name">Meet Emma Ju</h2>
          <p className="agent-position">Real Estate Specialist at Acre NJ</p>
          <div className="agent-description">
            <p>
              Emma Ju is a real estate professional with Acre NJ, specializing
              in residential and investment properties across Bergen County, New
              Jersey, and New York. With deep market knowledge and a reputation
              for trust and professionalism, she helps clients navigate both
              suburban and city transactions with ease.
            </p>

            <p>
              Fluent in English and Mandarin, Emma works with a diverse range of
              buyers, sellers, and investors. Her client-first approach, clear
              communication, and dedication to long-term relationships make her
              a standout guide in today’s competitive real estate market.
            </p>
          </div>

          <div className="content-footer">
            <ul className="lp-socials">
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
            <div className="cta">
              <a href="#/about" className="lp-link lp-link--dark">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
