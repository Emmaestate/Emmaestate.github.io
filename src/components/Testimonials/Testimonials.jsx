import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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

  // Extract initial for avatar
  const initial = comment.name ? comment.name.charAt(0).toUpperCase() : "C";

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-author-info">
          <div className="testimonial-avatar">{initial}</div>
          <div className="testimonial-author-details">
            <span className="testimonial-name">{comment.name}</span>
            <span className="testimonial-date">6 months ago</span>
          </div>
        </div>
        <div className="testimonial-stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < comment.star ? "star active" : "star"}>
              ★
            </span>
          ))}
        </div>
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
    </div>
  );
};

const Testimonials = ({
  title = "What Our Clients Say",
  subtitle = "Read success stories from people who have worked with us.",
}) => {
  const { lang } = useLanguage();
  return (
    <section className="testimonials-section">
      <div className="testimonials-header-section">
        <h2 className="testimonials-title">{title}</h2>
        <p className="testimonials-subtitle">{subtitle}</p>
      </div>

      <div className="testimonials-carousel-wrapper">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
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
              slidesPerView: 3,
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
    </section>
  );
};

export default Testimonials;
