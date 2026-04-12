import React, { useState } from "react";
import "./HomeValuationPopup.css";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import valuationConfig from "../../config/pages/Valuation.config.js";

const HomeValuationPopup = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: "",
    condition: "",
    updates: "",
    damage: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleNext = () => {
    if (step === 1 && !formData.address.trim()) {
      setErrorMsg(valuationConfig.alerts.addressRequired[lang]);
      return;
    }
    setErrorMsg("");
    setStep(step + 1);
  };

  const handleBack = () => {
    setErrorMsg("");
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() && !formData.phone.trim()) {
      setErrorMsg(valuationConfig.alerts.contactRequired[lang]);
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "51e54878-47c6-477b-85d6-ce0873aa6c65",
          subject: "New Home Valuation Request",
          address: formData.address,
          condition: formData.condition,
          updates: formData.updates,
          damage: formData.damage,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(valuationConfig.alerts.error[lang]);
      }
    } catch (error) {
      setErrorMsg(valuationConfig.alerts.error[lang]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSuccess(false);
    setErrorMsg("");
    setFormData({
      address: "",
      condition: "",
      updates: "",
      damage: "",
      name: "",
      email: "",
      phone: "",
    });
    onClose();
  };

  return (
    <div className="valuation-popup-overlay">
      <div className="valuation-popup-content">
        <button className="valuation-close-btn" onClick={resetAndClose}>
          &times;
        </button>

        {isSuccess ? (
          <div className="valuation-success">
            <h2>{valuationConfig.success.title[lang]}</h2>
            <p>{valuationConfig.success.message[lang]}</p>
            <button className="valuation-btn" onClick={resetAndClose}>
              {valuationConfig.buttons.close[lang]}
            </button>
          </div>
        ) : (
          <div className="valuation-form-container">
            <div className="valuation-header">
              <h2>{valuationConfig.title[lang]}</h2>
              {step === 1 && (
                <div className="valuation-intro">
                  <p>{valuationConfig.intro.p1[lang]}</p>
                  <ol>
                    <li>{valuationConfig.intro.step1[lang]}</li>
                    <li>{valuationConfig.intro.step2[lang]}</li>
                    <li>{valuationConfig.intro.step3[lang]}</li>
                  </ol>
                </div>
              )}
            </div>

            <div className="valuation-steps-indicator">
              <span className={step >= 1 ? "active" : ""}>1</span>
              <div className="line"></div>
              <span className={step >= 2 ? "active" : ""}>2</span>
              <div className="line"></div>
              <span className={step >= 3 ? "active" : ""}>3</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 3) handleSubmit(e);
                else handleNext();
              }}
            >
              {errorMsg && (
                <div className="valuation-error-msg">{errorMsg}</div>
              )}
              {step === 1 && (
                <div className="valuation-step">
                  <label>{valuationConfig.labels.address[lang]} *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={valuationConfig.placeholders.address[lang]}
                    required
                  />
                </div>
              )}

              {step === 2 && (
                <div className="valuation-step">
                  <label>{valuationConfig.labels.condition[lang]}</label>
                  <input
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    placeholder={valuationConfig.placeholders.condition[lang]}
                  />
                  <label>{valuationConfig.labels.updates[lang]}</label>
                  <input
                    type="text"
                    name="updates"
                    value={formData.updates}
                    onChange={handleChange}
                    placeholder={valuationConfig.placeholders.updates[lang]}
                  />
                  <label>{valuationConfig.labels.damage[lang]}</label>
                  <input
                    type="text"
                    name="damage"
                    value={formData.damage}
                    onChange={handleChange}
                    placeholder={valuationConfig.placeholders.damage[lang]}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="valuation-step">
                  <label>{valuationConfig.labels.name[lang]}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={valuationConfig.placeholders.name[lang]}
                  />
                  <label>{valuationConfig.labels.email[lang]}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={valuationConfig.placeholders.email[lang]}
                  />
                  <label>{valuationConfig.labels.phone[lang]}</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={valuationConfig.placeholders.phone[lang]}
                  />
                </div>
              )}

              <div className="valuation-footer">
                {step > 1 && (
                  <button
                    type="button"
                    className="valuation-btn outline"
                    onClick={handleBack}
                  >
                    {valuationConfig.buttons.back[lang]}
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    className="valuation-btn"
                    onClick={handleNext}
                  >
                    {valuationConfig.buttons.next[lang]}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="valuation-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? valuationConfig.buttons.submitting[lang]
                      : valuationConfig.buttons.submit[lang]}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeValuationPopup;
