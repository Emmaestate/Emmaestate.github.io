import React from "react";
import emma_image from "../../assets/emma.jpeg";
import instagram_icon from "../../assets/instagram.png";
import wechat_icon from "../../assets/wechat.png";
import youtube_icon from "../../assets/youtube.png";
import "./AgentProfile3.css";

const AgentProfile3 = ({
  title = "Meet Emma Ju",
  role = "TEAM LEADER | SALES MANAGER",
  paragraphs = [
    "Emma Ju is a real estate professional with Acre NY Realty and Acre NJ, specializing in Manhattan and New Jersey’s Gold Coast. In 2025, she achieved over $26 million in sales volume and was recognized with the NJ REALTORS® Circle of Excellence Sales Award® – Gold Level. With strong connections in new construction and off-market opportunities, along with access to a broad network of local and international buyers, she helps position properties to reach the right audience and maximize value.",
  ],
}) => {
  // Try to split the title intelligently for the design "MEET \n EMMA JU"
  const titleParts = title.split(" ");
  let firstLine = "";
  let secondLine = "";
  
  if (titleParts.length > 1) {
    firstLine = titleParts[0];
    secondLine = titleParts.slice(1).join(" ");
  } else {
    firstLine = title;
  }

  return (
    <div className="agent-profile3-container">
      <div className="agent-profile3-content">
        <h2 className="agent-profile3-title">
          {secondLine ? (
            <>
              <span className="title-part1">{firstLine}</span>
              <br />
              <span className="title-part2">{secondLine}</span>
            </>
          ) : (
            <span className="title-part1">{firstLine}</span>
          )}
        </h2>
        
        {role && (
          <p className="agent-profile3-role">
            {role}
          </p>
        )}
        
        <div className="agent-profile3-description">
          {paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>

        <div className="agent-profile3-socials">
          <a
            href="https://www.instagram.com/emmarocks_nyc?igsh=cWhrdndsMmp2OHVn&utm_source=qr"
            className="agent-profile3-social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src={instagram_icon} alt="Instagram" />
          </a>
          <a
            href="https://youtube.com/@emmaju1124?si=_26WGzY3BKVt_IJv"
            className="agent-profile3-social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <img src={youtube_icon} alt="YouTube" />
          </a>
          <div className="tooltip-container">
            <a
              href="#"
              className="agent-profile3-social-link"
              aria-label="WeChat"
              onClick={(e) => e.preventDefault()}
            >
              <img src={wechat_icon} alt="WeChat" />
            </a>
            <span className="tooltip-text">WeChat: emmarocks2</span>
          </div>
        </div>
      </div>
      <div className="agent-profile3-image-wrapper">
        <img className="agent-profile3-image" src={emma_image} alt={title} />
      </div>
    </div>
  );
};

export default AgentProfile3;