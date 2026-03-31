import React, { useEffect, useRef, useState } from 'react';
import './ContactForm.css';

const ContactForm = ({ className = '', style = {} }) => {
  const formRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let success = false;
    const search = window.location.search;
    if (search) {
      const params = new URLSearchParams(search);
      if (params.get('submitted') === 'true') success = true;
    }
    if (!success && window.location.hash.includes('?')) {
      const qs = window.location.hash.split('?')[1];
      const params = new URLSearchParams(qs);
      if (params.get('submitted') === 'true') success = true;
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
      action="https://formsubmit.co/xfcdxg_zq@163.com"
      method="POST"
      noValidate
    >
        <div className="contact-form__container">
          {submitted && (
            <div className="success-block">
              <h3 className="lp-h3 success-message" role="heading" aria-level="2">
                Thank you for your message. We will be in touch with you shortly.
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
                  placeholder="Your Name"
                  aria-label="Your Name"
                />
              </div>

              <div className="contact-form__item">
                <select
                  id="__Interest"
                  name="interest"
                  className="lp-input lp-input--light"
                  required
                  aria-label="Select an Interest"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an Interest
                  </option>
                  <option value="Buying">Buying</option>
                  <option value="Selling">Selling</option>
                  <option value="Area Information">Area Information</option>
                  <option value="Home Valuation">Home Valuation</option>
                  <option value="Other">Other</option>
                </select>
              </div>

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
              <input type="hidden" name="_subject" value="Emma Ju Estates Website Contact" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://Emmaestate.github.io/#/contact?submitted=true" />
            </div>
          </div>
        </div>
    </form>
  );
};

export default ContactForm;
