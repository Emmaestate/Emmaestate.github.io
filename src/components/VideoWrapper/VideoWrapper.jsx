import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VideoWrapper.css";

const preheadlinePhrases = ["WELCOME TO", "", ""];

const headlinePhrases = [
  "EMMA JU ESTATES",
  <>
    Specializing in Luxury
    <br /> REAL ESTATE
  </>,
  "Personalized Real Estate Experience",
];

const subheadingPhrases = [
  "Your Luxury Home Professional",
  "Real estate group in Bergen County",
  "Specializing in Manhattan, Fort Lee, Edgewater and new constructions",
];

const VideoWrapper = () => {
  const [hovered, setHovered] = useState(false);
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
        poster="https://res.cloudinary.com/luxuryp/videos/f_auto,q_auto/so_0,eo_0/qc2ltgqfyfkdelknxwl8/jade-mills-estates-coldwell-banker-beverly-hills-1.jpg"
        loop
        muted
        autoPlay
        playsInline
      >
        <source
          src="https://res.cloudinary.com/luxuryp/video/upload/f_webm,q_auto/v1/qc2ltgqfyfkdelknxwl8"
          type="video/webm"
        />
        <source
          src="https://res.cloudinary.com/luxuryp/video/upload/f_mp4,q_auto/v1/qc2ltgqfyfkdelknxwl8"
          type="video/mp4"
        />
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
          OUR PROPERTIES {hovered && <span>&nbsp;&#8640;</span>}
        </button>
      </div>
    </div>
  );
};

export default VideoWrapper;
