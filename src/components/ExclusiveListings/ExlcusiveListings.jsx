import React from 'react'
import EmblaCarousel from '../CarouselScale/EmblaCarousel.jsx'
import '../CarouselScale/base.css'
import '../CarouselScale/embla.css'


const OPTIONS = { slidesToScroll: 'auto' }
const SLIDE_COUNT = 5
const SLIDES = [
  {
    id: 1,
    imgUrl: 'https://via.placeholder.com/600x400',
    price: '$250,000',
    address: '123 Maple St, Boston, MA',
    beds: 3,
    baths: 2
  },
  {
    id: 2,
    imgUrl: 'https://via.placeholder.com/600x400',
    price: '$625,000',
    address: '456 Oak Ave, Cambridge, MA',
    beds: 4,
    baths: 3
  },
  // ... add more listings
]



const ExclusiveListings = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </>
)

export default ExclusiveListings
