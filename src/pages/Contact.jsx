import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WOW from "../lib/wow";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import x_icon from "../assets/X.png";
import instagram_icon from "../assets/instagram.png";
import wechat_icon from "../assets/wechat.png";
import youtube_icon from "../assets/youtube.png";
import facebook_icon from "../assets/facebook.png";
import "animate.css";
import "./Contact.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import contactConfig from "../config/pages/Contact.config.js";

function Contact() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    new WOW().init();
  }, []);

  const handleExit = () => {
    setFade("fade-out");
    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }, 250);
  };

  return (
    <div className={`contact-page contact-form lp-vertical-paddings lp-container ${fade}`}>
      <div className="header-container">
        <div className="contact-form__header-row">
          <h1
            className="contact-form__header__title lp-h2 h-m1"
            role="heading"
            aria-level="2"
          >
            {contactConfig.headerTitle[lang]}
          </h1>

          <button
            className="exit-button"
            onClick={handleExit}
            aria-label="Close Contact Form"
          >
            &times;
          </button>
        </div>
       
      </div>

      <div className="contact-form__contents">
        <div className="contact-form__contents-form">
          <div className="contact-form-message">
            <h3>{contactConfig.messageTitle[lang]}</h3>
            <p>{contactConfig.messageDesc[lang]}</p>
            <div style={{ marginTop: "20px" }}>
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="contact-form__info">
          <div className="info-footer">
            <div className="info-footer__col">
              <div className="info-footer__title">
                {contactConfig.contactDetailsTitle[lang]}
              </div>
              <div>
                <strong>{contactConfig.specialization[lang]}</strong>
              </div>
              <div>{contactConfig.name[lang]}</div>
              <ul className="links-list">
                <li className="link">
                  <a
                    href={`mailto:${contactConfig.email[lang]}`}
                    className="hyperlink-style-3"
                  >
                    {contactConfig.email[lang]}
                  </a>
                </li>
                <li className="link">
                  <a href="tel:2017421625" className="hyperlink-style-3">
                    {contactConfig.phone[lang]}
                  </a>
                </li>
              </ul>
            </div>

            <div className="info-footer__col">
              <div className="info-footer__title">
                {contactConfig.locationTitle[lang]}
              </div>
              <p>
                <span style={{ color: "#aaa" }}>
                  {contactConfig.njLabel[lang]}
                </span>{" "}
                {contactConfig.njAddrLine1[lang]}
                <br />
                {contactConfig.njAddrLine2[lang]}
                <br />
                <span style={{ color: "#aaa" }}>
                  {contactConfig.nyLabel[lang]}
                </span>{" "}
                {contactConfig.nyAddrLine1[lang]}
                <br />
                {contactConfig.nyAddrLine2[lang]}
              </p>
            </div>
          </div>

          <div className="social-media-icons">
            <ul className="social-icons-list">
              <li style={{ display: "none" }}>
                <a
                  href="#"
                  aria-label="X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={x_icon} alt="X" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/emmarocks_nyc?igsh=cWhrdndsMmp2OHVn&utm_source=qr"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={instagram_icon} alt="Instagram" />
                </a>
              </li>
              <li style={{ display: "none" }}>
                <a
                  href="https://facebook.com/yourprofile"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={facebook_icon} alt="Facebook" />
                </a>
              </li>
              <li>
                <div className="tooltip-container">
                  <a
                    href="#"
                    aria-label="WeChat"
                    onClick={(e) => e.preventDefault()}
                  >
                    <img src={wechat_icon} alt="WeChat" />
                  </a>
                  <span className="tooltip-text">WeChat: emmarocks2</span>
                </div>
              </li>
              <li>
                <a
                  href="https://youtube.com/@emmaju1124?si=_26WGzY3BKVt_IJv"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={youtube_icon} alt="YouTube" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
