import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoWrapper.css";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import homeConfig from "../../config/pages/Home.config.js";
import mainBannerVideo from "../../assets/main_banner.mp4";
import coverImage from "../../assets/cover.jpeg";

const getHeadlineNodes = (arr) =>
  arr.map((text, idx) => {
    const parts = String(text).split("\n");
    return parts.length > 1 ? (
      <>
        {parts[0]}
        <br />
        {parts[1]}
      </>
    ) : (
      text
    );
  });

const VideoWrapper = () => {
  const [hovered, setHovered] = useState(false);
  const { lang } = useLanguage();
  const preheadlinePhrases = homeConfig.videoWrapper.preheadline[lang];
  const headlinePhrases = getHeadlineNodes(
    homeConfig.videoWrapper.headline[lang],
  );
  const subheadingPhrases = homeConfig.videoWrapper.subheading[lang];
  const [preheadlineIndex, setpreHeadlineIndex] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [subheadingIndex, setSubheadingIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const headlineInterval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlinePhrases.length);
    }, 4000);

    const subheadingInterval = setInterval(() => {
      setSubheadingIndex((prev) => (prev + 1) % subheadingPhrases.length);
    }, 4000);

    const preheadlineInterval = setInterval(() => {
      setpreHeadlineIndex((prev) => (prev + 1) % preheadlinePhrases.length);
    }, 4000);

    return () => {
      clearInterval(headlineInterval);
      clearInterval(subheadingInterval);
    };
  }, []);

  return (
    <div className="video-wrapper">
      <video
        className="background-video"
        poster={coverImage}
        loop
        muted
        autoPlay
        playsInline
      >
        <source src={mainBannerVideo} type="video/mp4" />
      </video>

      <div className="overlay" />

      <div className="hero-text">
        <p className="subtitle">{preheadlinePhrases[preheadlineIndex]}</p>
        <p className="fade-text">{headlinePhrases[headlineIndex]}</p>
        <p className="description fade-text">
          {subheadingPhrases[subheadingIndex]}
        </p>
        <button
          className="btn5"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => navigate("/properties/exclusivelist")}
        >
          {homeConfig.videoWrapper.cta[lang]}{" "}
          {hovered && <span>&nbsp;&#8640;</span>}
        </button>
      </div>
    </div>
  );
};

export default VideoWrapper;
