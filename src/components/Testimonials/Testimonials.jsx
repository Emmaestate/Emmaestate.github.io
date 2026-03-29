import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Testimonials.css";
import commentsData from "../../data/comments.json";

const ReviewCard = ({ comment }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_LENGTH = 150;
  const isLong = comment.content.length > MAX_LENGTH;

  // Generate an avatar initial
  const avatarInitial = comment.name
    ? comment.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          {comment.avatar ? (
            <img src={comment.avatar} alt={comment.name} />
          ) : (
            <div className="avatar-placeholder">{avatarInitial}</div>
          )}
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{comment.name}</h4>
          <span className="testimonial-date">{comment.date}</span>
        </div>
        <div className="testimonial-stars" style={{ marginLeft: "auto" }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < comment.star ? "star active" : "star"}>
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="testimonial-content">
        <div
          className={`testimonial-text-wrapper ${isExpanded ? "expanded" : ""}`}
        >
          <p>{comment.content}</p>
        </div>
        {isLong && (
          <button
            className="read-more-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show less" : "Read more"}
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
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-title-wrapper">
          <h2 className="testimonials-title">{title}</h2>
          <p className="testimonials-subtitle">{subtitle}</p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
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
