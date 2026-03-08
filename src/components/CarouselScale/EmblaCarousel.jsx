// EmblaCarousel.jsx
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const OPTIONS = { loop: true, align: 'start', slidesToScroll: 2 }

const SLIDES = [
  {
    id: 1,
    imgUrl: 'https://www.theplancollection.com/_next/image?url=https%3A%2F%2Fwww.theplancollection.com%2FUpload%2FDesigners%2F106%2F1353%2FPlan1061353MainImage_25_7_2024_13.jpg&w=3840&q=70',
    price: '$750,000',
    address: '123 Maple St, Boston, MA',
    beds: 3,
    baths: 2
  },
  {
    id: 2,
    imgUrl: 'https://i.pinimg.com/736x/73/2f/0f/732f0f39bf2cf1dfe527797d46ed19b6.jpg',
    price: '$625,000',
    address: '456 Oak Ave, Cambridge, MA',
    beds: 4,
    baths: 3
  },
  {
    id: 3,
    imgUrl: 'https://www.marvin.com/_next/image?url=https%3A%2F%2Fa-us.storyblok.com%2Ff%2F1019562%2F1920x1280%2Fb5626ce655%2Fmarvin-modern-direct-glaze-window-direct-glaze-round-top-window-picture-window-36-hendel.png%2Fm%2Ffilters%3Aquality(100)%3Afill(transparent)&w=3840&q=75',
    price: '$910,000',
    address: '789 Pine Rd, Somerville, MA',
    beds: 5,
    baths: 4
  },
  {
    id: 4,
    imgUrl: 'https://via.placeholder.com/600x400',
    price: '$530,000',
    address: '321 Elm St, Brookline, MA',
    beds: 2,
    baths: 2
  },
  {
    id: 5,
    imgUrl: 'https://via.placeholder.com/600x400',
    price: '$860,000',
    address: '654 Cedar Dr, Newton, MA',
    beds: 4,
    baths: 3
  },
  {
    id: 6,
    imgUrl: 'https://via.placeholder.com/600x400',
    price: '$1,200,000',
    address: '987 Birch Blvd, Lexington, MA',
    beds: 6,
    baths: 5
  }
]

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)

  const {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick
  } = useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__controls">
        <h1 className="embla__heading">EMMA'S PORTFOLIO</h1>
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
                    <span>{slide.beds} Beds</span> · <span>{slide.baths} Baths</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
