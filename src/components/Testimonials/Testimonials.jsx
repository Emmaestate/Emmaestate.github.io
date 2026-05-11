import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Testimonials.css";
import commentsData from "../../data/comments.json";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const ReviewCard = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { lang } = useLanguage();

  const MAX_LENGTH = 150;
  const displayContent =
    lang === "zh" && comment.content_zh ? comment.content_zh : comment.content;
  const isLong = displayContent.length > MAX_LENGTH;

  // Extract a short title from the comment or use a default one
  const title = lang === "zh" 
    ? "专业、知识渊博且易于合作" 
    : "Professional, knowledgeable, and easy to work with";

  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < comment.star ? "star active" : "star"}>
            ★
          </span>
        ))}
      </div>

      <div className="testimonial-content">
        <div className={`testimonial-text-wrapper ${isExpanded ? "expanded" : ""}`}>
          <p>{displayContent}</p>
        </div>
        {isLong && (
          <button
            className="read-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded
              ? lang === "zh"
                ? "收起"
                : "Show less"
              : lang === "zh"
                ? "阅读更多"
                : "Read more"}
          </button>
        )}
      </div>

      <div className="testimonial-author">
        — {comment.name}
      </div>
    </div>
  );
};

const Testimonials = ({
  title = "OUR CLIENTS",
  subtitle = "ABOUT US",
}) => {
  const { lang } = useLanguage();
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-left">
          <p className="testimonials-subtitle">{subtitle}</p>
          <h2 className="testimonials-title">{title}</h2>
        </div>

        <div className="testimonials-right">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            className="testimonials-swiper"
          >
            {commentsData.map((comment) => (
              <SwiperSlide key={comment.id}>
                <ReviewCard comment={comment} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
