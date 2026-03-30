// EmblaCarousel.jsx
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import soldData from "../../data/soldListings.json";
import { images } from "../../data/images";
import { useLanguage } from "../../i18n/LanguageContext.jsx";
import homeConfig from "../../config/pages/Home.config.js";

const OPTIONS = {
  loop: true,
  align: "start",
  slidesToScroll: 2,
  breakpoints: {
    "(max-width: 768px)": { slidesToScroll: 1 },
  },
};

const SLIDES = soldData.map((item) => ({
  id: item.id,
  imgUrl: images[item.imageKey] || "https://via.placeholder.com/600x400",
  price: `$${item.price.toLocaleString()}`,
  address: item.address,
  beds: item.bedrooms,
  baths: item.bathrooms,
}));

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const { lang } = useLanguage();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__controls">
        <h1 className="embla__heading">{homeConfig.portfolio.title[lang]}</h1>
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {SLIDES.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              <div className="listing-card">
                <img
                  src={slide.imgUrl}
                  alt={`Listing ${slide.id}`}
                  className="listing-image"
                />
                <div className="listing-info">
                  <div className="listing-price">{slide.price}</div>
                  <div className="listing-address">{slide.address}</div>
                  <div className="listing-details">
                    <span>{slide.beds} {homeConfig.portfolio.beds[lang]}</span> ·{" "}
                    <span>{slide.baths} {homeConfig.portfolio.baths[lang]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
