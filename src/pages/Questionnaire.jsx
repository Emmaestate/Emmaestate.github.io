import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Questionnaire.css";

const Questionnaire = () => {
  const { lang } = useLanguage();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const CORRECT_PASSWORD = "VEX2ZTqg0NFYwGJB";

  useEffect(() => {
    // 检查 URL 中的 password 参数
    const searchParams = new URLSearchParams(location.search);
    const urlPassword = searchParams.get("pwd");
    
    if (urlPassword === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    }

    // 页面进入时的淡入动画
    setTimeout(() => {
      setIsLoaded(true);
    }, 50);
  }, [location.search]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg(lang === "en" ? "Incorrect password. Please try again." : "密码错误，请重试。");
    }
  };

  const formUrl =
    lang === "en"
      ? "https://docs.google.com/forms/d/e/1FAIpQLSf7bVlCXoIRK3p97HmOV0lasu3rMvOx4eeFErjVC9hyEahwXQ/viewform?embedded=true"
      : "https://docs.google.com/forms/d/e/1FAIpQLScKgwJT5Ni7BivMZ_I6j71_4XTpsvYDGFjpf5BLdi5fazmuLQ/viewform?embedded=true";

  return (
    <div className={`questionnaire-page ${isLoaded ? "page-fade-in" : ""}`}>
      <Layout />
      
      <div className="questionnaire-content">
        {!isAuthenticated ? (
          <div className="password-prompt-container">
            <h2 className="password-prompt-title">
              {lang === "en" ? "Protected Content" : "受保护的内容"}
            </h2>
            <p className="password-prompt-desc">
              {lang === "en" 
                ? "Please enter the password to view the questionnaire." 
                : "请输入访问密码以查看问卷内容。"}
            </p>
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <input
                type="password"
                className="password-input"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder={lang === "en" ? "Enter password" : "请输入密码"}
                autoFocus
              />
              <button type="submit" className="password-submit-btn">
                {lang === "en" ? "Submit" : "提交"}
              </button>
            </form>
            {errorMsg && <p className="password-error-msg">{errorMsg}</p>}
          </div>
        ) : (
          <div className="questionnaire-container">
            <iframe
              src={formUrl}
              width="100%"
              height="1500"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              title="Buyer Questionnaire"
              className="questionnaire-iframe"
            >
              Loading…
            </iframe>
          </div>
        )}
      </div>

      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
};

export default Questionnaire;