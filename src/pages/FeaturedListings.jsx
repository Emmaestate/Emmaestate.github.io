import React from "react";
import Layout from "../Components/Layout/Layout.jsx";
import connectWithUsImg from "../assets/connectwithus.jpg";
import ContactFormPopup from "../Components/ContactFormPopup/ContactFormPopup.jsx";
import PropertyList from "../Components/PropertyList/PropertyList.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Hero2 from "../Components/Hero2/Hero2.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import activeData from "../data/activeListings.json";
import { images } from "../data/images";

const featuredProperties = activeData.map((item) => ({
  id: `active-${item.id}`,
  ...item,
  image: images[item.imageKey],
}));

const FeaturedListings = () => {
  return (
    <div>
      <Layout />

      <div>
        <Hero2
          title="OUR FEATURED LISTINGS"
          description="Emma Ju features Bergen Counties property. Ju can find real estate in Alpine, Tenafly, Englewood Cliffs, NJ & more"
          showButton={false}
          backgroundImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        />
      </div>

      <PropertyList properties={featuredProperties} />

      <div>
        <Hero
          subtitle="Manhattan, Fort Lee, Edgewater and Bergen county Licensed Realtor"
          title="CONNECT WITH EMMA"
          description="Emma specializes in Bergen County NJ and NYC buyers, sellers, and renters."
          btnText="CONTACT EMMA"
          backgroundImage="https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg"
          height="700px"
        />
      </div>

      <ContactFormPopup />

      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
};

export default FeaturedListings;
