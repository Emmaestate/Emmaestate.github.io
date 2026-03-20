import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WOW from "../lib/wow";
import ContactFormPopup from "../components/ContactFormPopup/ContactFormPopup";
import x_icon from "../assets/X.png";
import instagram_icon from "../assets/instagram.png";
import wechat_icon from "../assets/wechat.png";
import youtube_icon from "../assets/youtube.png";
import facebook_icon from "../assets/facebook.png";
import "animate.css";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    new WOW().init();
  }, []);

  const handleExit = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back if possible
    } else {
      navigate("/"); // Otherwise fallback to home
    }
  };

  return (
    <div className="contact-form lp-vertical-paddings lp-container">
      <div className="header-container">
        <div className="contact-form__header-row">
          <h1
            className="contact-form__header__title lp-h2 h-m1"
            role="heading"
            aria-level="2"
          >
            <span className="word">
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0s"
              >
                G
              </span>
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.1s"
              >
                e
              </span>
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.2s"
              >
                t
              </span>
            </span>
            <span className="word">
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.3s"
              >
                I
              </span>
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.4s"
              >
                n
              </span>
            </span>
            <span className="word">
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.5s"
              >
                T
              </span>
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.6s"
              >
                o
              </span>
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.7s"
              >
                u
              </span>
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.8s"
              >
                c
              </span>
              <span
                className="letter wow animate__animated animate__fadeInDown"
                data-wow-delay="0.9s"
              >
                h
              </span>
            </span>
          </h1>

          <button
            className="exit-button"
            onClick={handleExit}
            aria-label="Close Contact Form"
          >
            &times;
          </button>
        </div>
        <p className="contact-form__header__subtitle lp-pre-line">
          Work with our world-class team.
        </p>
      </div>

      <div className="contact-form__contents">
        <div className="contact-form__contents-form">
          <div className="contact-form-message">
            <h3>Leave a Message</h3>
            <p>
              Interested in buying or selling? Let's connect and find your
              perfect solution.
            </p>
            <div style={{ marginTop: "20px" }}>
              <ContactFormPopup
                customButton={
                  <button className="link-btn">LET'S CONNECT</button>
                }
              />
            </div>
          </div>
        </div>

        <div className="contact-form__info">
          <div className="info-footer">
            <div className="info-footer__col">
              <div className="info-footer__title">Contact Details</div>
              <div>
                <strong>Specializing in Luxury Real Estate</strong>
              </div>
              <div>Lizhen (Emma) Ju</div>
              <ul className="links-list">
                <li className="link">
                  <a
                    href="mailto:realtorlzj@gmail.com"
                    className="hyperlink-style-3"
                  >
                    realtorlzj@gmail.com
                  </a>
                </li>
                <li className="link">
                  <a href="tel:2017421625" className="hyperlink-style-3">
                    (201)-742-1625
                  </a>
                </li>
              </ul>
            </div>

            <div className="info-footer__col">
              <div className="info-footer__title">Location</div>
              <p>
                <span style={{ color: "#aaa" }}>NJ OFFICE:</span> 2160 N Central
                Rd #111, <br />
                Fort Lee, NJ 07024
                <br />
                <span style={{ color: "#aaa" }}>NY OFFICE:</span> 45-10 Court
                Square FL 1, <br />
                Long Island City, New York, 11101
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
