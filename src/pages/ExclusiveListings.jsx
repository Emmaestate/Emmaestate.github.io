import React from 'react'
import Layout from '../Components/Layout/Layout.jsx'
import connectWithUsImg from '../assets/connectwithus.jpg';
import ContactFormPopup from '../Components/ContactFormPopup/ContactFormPopup.jsx'
import PropertyList from '../Components/PropertyList/PropertyList.jsx'
import Hero from '../Components/Hero/Hero.jsx';
import Hero2 from '../Components/Hero2/Hero2.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import tempImg from '../assets/connectwithus.jpg'; // Placeholder image for properties
import white_beeches from '../assets/tempProperties/73_white_beeches.jpg';
import temp1 from '../assets/tempProperties/temp1.jpeg';
import temp2 from '../assets/tempProperties/temp2.jpeg';
import temp3 from '../assets/tempProperties/temp3.jpeg';
import temp4 from '../assets/tempProperties/temp4.jpeg';
import temp5 from '../assets/tempProperties/temp5.jpeg';
import temp6 from '../assets/tempProperties/temp6.jpeg';
import temp7 from '../assets/tempProperties/temp7.jpeg';
import temp8 from '../assets/tempProperties/temp8.jpeg';

const exclusiveProperties = [
  {
    id: '1',
    image: white_beeches,
    address: '123 Maple Street, Fort Lee, NJ',
    price: 950000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
  },
  {
    id: '2',
    image: temp2,
    address: '456 Oak Avenue, Paramus, NJ',
    price: 925000,
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
  },
  {
    id: '3',
    image: temp3,
    address: '789 Pine Lane, Tenafly, NJ',
    price: 790000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2500,
  },
  {
    id: '4',
    image: temp4,
    address: '321 Cedar Rd, Englewood, NJ',
    price: 870000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
  },
  {
    id: '5',
    image: temp5,
    address: '654 Spruce Blvd, Ridgewood, NJ',
    price: 950000,
    bedrooms: 5,
    bathrooms: 3,
    sqft: 3400,
  },
  {
    id: '6',
    image: temp6,
    address: '987 Elm St, Closter, NJ',
    price: 880000,
    bedrooms: 4,
    bathrooms: 2,
    sqft: 2700,
  },
  {
    id: '7',
    image: temp7,
    address: '101 Birch Rd, Leonia, NJ',
    price: 810000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2300,
  },
  {
    id: '8',
    image: temp8,
    address: '101 Beech Rd, Teaneck, NJ',
    price: 710000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2300,
  },

  
];

const ExclusiveListings = () => {
 return(
   <div>
      <Layout/>

      <div>
        <Hero2
          title="OUR EXCLUSIVE LISTINGS"
          description="Emma Ju features Bergen Counties property. Ju can find real estate in Alpine, Tenafly, Englewood Cliffs, NJ & more"
          showButton={false}
          backgroundImage='https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg'
        />
      </div>

      <PropertyList properties={exclusiveProperties} />

      <div>
        <Hero
          subtitle="New Jersey & New York Licensed Realtor"
          title="CONNECT WITH EMMA"
          description="Emma specializes in Bergen County NJ and NYC buyers, sellers, and renters."
          btnText="CONTACT EMMA"
          backgroundImage={connectWithUsImg}
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


export default ExclusiveListings;

