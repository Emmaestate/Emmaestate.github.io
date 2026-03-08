import React from 'react'
import Layout from '../Components/Layout/Layout.jsx'
import connectWithUsImg from '../assets/connectwithus.jpg';
import ContactFormPopup from '../Components/ContactFormPopup/ContactFormPopup.jsx'
import PropertyList from '../Components/PropertyList/PropertyList.jsx'
import Hero from '../Components/Hero/Hero.jsx';
import Hero2 from '../Components/Hero2/Hero2.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import white_beeches from '../assets/tempProperties/73_white_beeches.jpg';
import heatherhill from '../assets/tempProperties/9_heatherhill.jpg';
import ray from '../assets/tempProperties/21_ray.jpg';
import laurel from '../assets/tempProperties/263_laurel.jpg';
import longview from '../assets/tempProperties/502_longview.jpg';
import drexel from '../assets/tempProperties/671_drexel.jpg';
import jones from '../assets/tempProperties/2187_jones_rd.jpg';


const soldProperties = [
  {
    id: '1',
    image: heatherhill,
    address: '9 Heatherhill Rd, Demarest, NJ',
    price: 2650000,
    bedrooms: 6,
    bathrooms: 7,
    sqft: 5000,
  },
  {
    id: '2',
    image: jones,
    address: '2187 Jones Rd, Fort Lee, NJ',
    price: 1450000,
    bedrooms: 3,
    bathrooms: 6,
    sqft: 4200,
  },
  {
    id: '3',
    image: laurel,
    address: '263 Laurel Ave, Kearny, NJ',
    price: 850000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 1944,
  },
  {
    id: '4',
    image: drexel,
    address: '671 Drexel Rd, Paramus, NJ',
    price: 1445000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3000,
  },
  {
    id: '5',
    image: longview,
    address: '502 Longview Place, Cliffside Park, NJ',
    price: 999000,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3000,
  },
  {
    id: '6',
    image: white_beeches,
    address: '73 White Beeches Dr, Dumont, NJ',
    price: 760000,
    bedrooms: 4,
    bathrooms: 2.5,
    sqft: 7710,
  },
  {
    id: '7',
    image: ray,
    address: '21 Ray Ave, Leonia, NJ',
    price: 999800,
    bedrooms: 3,
    bathrooms: 3,
    sqft: 9439,
  },
  
];

const SoldListings = () => {
 return(
   <div>
      <Layout/>

      <div>
        <Hero2
          title="OUR SOLD LISTINGS"
          description="Emma Ju features Bergen Counties property. Ju can find real estate in Alpine, Tenafly, Englewood Cliffs, NJ & more"
          showButton={false}
          backgroundImage='https://images.pexels.com/photos/2988860/pexels-photo-2988860.jpeg'
        />
      </div>

      <PropertyList properties={soldProperties} />

      <div>
        <Hero
          subtitle="New Jersey & New York Licensed Realtor"
          title="CONNECT WITH EMMA"
          description="Emma specializes in Bergen County NJ and NYC buyers, sellers, and renters."
          btnText="CONTACT EMMA"
          backgroundImage='https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg'
          height="700px"
        />
      </div>

    <ContactFormPopup/>

    <div className='container-type1'>
      <Footer/>
    </div> */

   </div>
 )
}


export default SoldListings;

