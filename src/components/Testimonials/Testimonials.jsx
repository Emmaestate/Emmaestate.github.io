import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Testimonials.css";
import commentsData from "../../data/comments.json";
import { useLanguage } from "../../i18n/LanguageContext.jsx";

const TIME_UNITS_IN_DAYS = {
  minute: 1 / 1440,
  minutes: 1 / 1440,
  hour: 1 / 24,
  hours: 1 / 24,
  day: 1,
  days: 1,
  week: 7,
  weeks: 7,
  month: 30,
  months: 30,
  year: 365,
  years: 365,
  分钟: 1 / 1440,
  小时: 1 / 24,
  天: 1,
  周: 7,
  星期: 7,
  月: 30,
  个月: 30,
  年: 365,
};

function timeAgoInDays(value) {
  const text = String(value || "")
    .trim()
    .toLowerCase();
  if (!text) return Number.POSITIVE_INFINITY;
  if (["just now", "today", "刚刚", "今天"].includes(text)) return 0;
  if (["yesterday", "昨天"].includes(text)) return 1;

  const relativeMatch = text.match(
    /^(?:(\d+(?:\.\d+)?)|(a|an))\s*(minutes?|hours?|days?|weeks?|months?|years?|分钟|小时|天|周|星期|个月|月|年)\s*(?:ago|前)?$/,
  );
  if (relativeMatch) {
    const amount = relativeMatch[1] ? Number(relativeMatch[1]) : 1;
    return amount * TIME_UNITS_IN_DAYS[relativeMatch[3]];
  }

  const timestamp = Date.parse(text);
  return Number.isNaN(timestamp)
    ? Number.POSITIVE_INFINITY
    : Math.max(0, (Date.now() - timestamp) / 86400000);
}

const sortedComments = commentsData
  .map((comment, originalIndex) => ({ comment, originalIndex }))
  .sort(
    (a, b) =>
      timeAgoInDays(a.comment.date) - timeAgoInDays(b.comment.date) ||
      a.originalIndex - b.originalIndex,
  )
  .map(({ comment }) => comment);

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
            {comment.date && (
              <span className="testimonial-date">{comment.date}</span>
            )}
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
        <div
          className={`testimonial-text-wrapper ${isExpanded ? "expanded" : ""}`}
        >
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
  const [swiper, setSwiper] = useState(null);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  const updateNavigation = (instance) => {
    setCanGoPrev(!instance.isBeginning);
    setCanGoNext(!instance.isEnd);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-header-section">
        <h2 className="testimonials-title">{title}</h2>
        <p className="testimonials-subtitle">{subtitle}</p>
      </div>

      <div className="testimonials-carousel-wrapper">
        {canGoPrev && (
          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-prev"
            onClick={() => swiper?.slidePrev()}
            aria-label="上一页评价"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSwiper={(instance) => {
            setSwiper(instance);
            updateNavigation(instance);
          }}
          onSlideChange={updateNavigation}
          onResize={updateNavigation}
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
          {sortedComments.map((comment) => (
            <SwiperSlide key={comment.id}>
              <ReviewCard comment={comment} />
            </SwiperSlide>
          ))}
        </Swiper>
        {canGoNext && (
          <button
            type="button"
            className="testimonials-arrow testimonials-arrow-next"
            onClick={() => swiper?.slideNext()}
            aria-label="下一页评价"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
