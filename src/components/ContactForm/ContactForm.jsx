import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ className = '', style = {} }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your submission logic here
    setFormSubmitted(true);
  };

  return (
    <form className={`contact-form-component ${className}`} style={style} onSubmit={handleSubmit} noValidate>
      {!formSubmitted ? (
        <div className="contact-form__container">
          <h3 className="lp-h3" role="heading" aria-level="1">
            Leave a Message
          </h3>

          <div className="contact-form__content">
            <div className="contact-form__inputs-container">
              <div className="contact-form__item">
                <input
                  id="__Email"
                  type="email"
                  name="email"
                  className="lp-input lp-input--light"
                  required
                  placeholder="Your Email"
                  aria-label="Your Email"
                />
              </div>

              <div className="contact-form__item">
                <input
                  className="lp-input lp-input--light"
                  type="tel"
                  placeholder="Phone"
                  id="__Phone"
                  name="phone"
                  required
                  aria-label="Phone"
                />
              </div>

              <div className="contact-form__item">
                <textarea
                  name="message"
                  rows="4"
                  id="__Message"
                  className="lp-input lp-input--light"
                  placeholder="Your Message"
                  required
                  aria-label="Your Message"
                />
              </div>

              <div className="lp-disclaimer">
                <label className="lp-tcr-content">
                  <span className="lp-tcr-checkbox">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      required
                      aria-required="true"
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          'Please accept the terms and conditions'
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity('')}
                    />
                  </span>
                  <span className="lp-tcr-message">
                    By providing Emma Ju Estates your contact
                    information, you acknowledge and agree to our{' '}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Privacy Policy - open in a new tab"
                    >
                      Privacy Policy
                    </a>{' '}
                    and consent to receiving marketing communications,
                    including automated calls, texts, and emails.
                    Consent isn’t necessary for purchasing products or
                    services. You may opt out anytime.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="lp-btn lp-btn--filled lp-btn--dark submit contact-form__item"
              >
                Submit
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
                style={{ display: 'none' }}
                type="text"
                name="source"
                value="CONTACT_INQUIRY"
                aria-label="Hidden source field"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="success-block">
          <h3 className="lp-h3 success-message" role="heading" aria-level="2">
            Thank you for your message. We will be in touch with you shortly.
          </h3>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
