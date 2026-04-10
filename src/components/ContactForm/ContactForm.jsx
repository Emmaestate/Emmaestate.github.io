import React, { useEffect, useRef, useState } from "react";
import "./ContactForm.css";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import contactFormConfig from "../../config/pages/ContactForm.config.js";

const ContactForm = ({ className = "", style = {} }) => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    let success = false;
    const search = window.location.search;
    if (search) {
      const params = new URLSearchParams(search);
      if (params.get("submitted") === "true") success = true;
    }
    if (!success && window.location.hash.includes("?")) {
      const qs = window.location.hash.split("?")[1];
      const params = new URLSearchParams(qs);
      if (params.get("submitted") === "true") success = true;
    }
    if (success) {
      setSubmitted(true);
      if (formRef.current) formRef.current.reset();
    }
  }, []);

  return (
    <form
      ref={formRef}
      className={`contact-form-component ${className}`}
      style={style}
      action="https://api.web3forms.com/submit"
      method="POST"
      noValidate
    >
      <input
        type="hidden"
        name="access_key"
        value="cf8f42ba-4d94-4c37-b372-e3b9477b9bcb"
      />

      <div className="contact-form__container">
        {submitted && (
          <div className="success-block">
            <h3 className="lp-h3 success-message" role="heading" aria-level="2">
              {contactFormConfig.successMessage[lang]}
            </h3>
          </div>
        )}

        <div className="contact-form__content">
          <div className="contact-form__inputs-container">
            <div className="contact-form__item">
              <input
                id="__Name"
                type="text"
                name="name"
                className="lp-input lp-input--light"
                required
                placeholder={contactFormConfig.namePlaceholder[lang]}
                aria-label={contactFormConfig.namePlaceholder[lang]}
              />
            </div>

            <div className="contact-form__item">
              <select
                id="__Interest"
                name="interest"
                className="lp-input lp-input--light"
                required
                aria-label={contactFormConfig.interestPlaceholder[lang]}
                defaultValue=""
              >
                <option value="" disabled>
                  {contactFormConfig.interestPlaceholder[lang]}
                </option>
                <option value="Buying">
                  {contactFormConfig.interests.buying[lang]}
                </option>
                <option value="Selling">
                  {contactFormConfig.interests.selling[lang]}
                </option>
                <option value="Area Information">
                  {contactFormConfig.interests.areaInfo[lang]}
                </option>
                <option value="Home Valuation">
                  {contactFormConfig.interests.valuation[lang]}
                </option>
                <option value="Other">
                  {contactFormConfig.interests.other[lang]}
                </option>
              </select>
            </div>

            <div className="contact-form__item">
              <input
                id="__Email"
                type="email"
                name="email"
                className="lp-input lp-input--light"
                required
                placeholder={contactFormConfig.emailPlaceholder[lang]}
                aria-label={contactFormConfig.emailPlaceholder[lang]}
              />
            </div>

            <div className="contact-form__item">
              <input
                className="lp-input lp-input--light"
                type="tel"
                placeholder={contactFormConfig.phonePlaceholder[lang]}
                id="__Phone"
                name="phone"
                required
                aria-label={contactFormConfig.phonePlaceholder[lang]}
              />
            </div>

            <div className="contact-form__item">
              <textarea
                name="message"
                rows="4"
                id="__Message"
                className="lp-input lp-input--light"
                placeholder={contactFormConfig.messagePlaceholder[lang]}
                required
                aria-label={contactFormConfig.messagePlaceholder[lang]}
              />
            </div>

            <button
              type="submit"
              className="lp-btn lp-btn--filled lp-btn--dark submit contact-form__item"
            >
              {contactFormConfig.submitBtn[lang]}
            </button>

            <div className="lp-h-pot" aria-hidden="true">
              <input
                id="__newsSignMiddleName"
                name="middleName"
                value=""
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            <input
              style={{ display: "none" }}
              type="text"
              name="source"
              value="CONTACT_INQUIRY"
              aria-label="Hidden source field"
            />
            <input
              type="hidden"
              name="_subject"
              value="Emma Ju Estates Website Contact"
            />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input
              type="hidden"
              name="_next"
              value="https://Emmaestate.github.io/#/contact?submitted=true"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
