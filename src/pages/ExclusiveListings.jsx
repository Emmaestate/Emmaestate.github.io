import React from "react";
import Layout from "../Components/Layout/Layout.jsx";
import connectWithUsImg from "../assets/connectwithus.jpg";
import ContactFormPopup from "../Components/ContactFormPopup/ContactFormPopup.jsx";
import PropertyList from "../Components/PropertyList/PropertyList.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Hero2 from "../Components/Hero2/Hero2.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import tempImg from "../assets/connectwithus.jpg"; // Placeholder image for properties
import exclusiveData from "../data/exclusiveListings.json";
import { images } from "../data/images";

const exclusiveProperties = exclusiveData.map((item) => ({
  id: `exclusive-${item.id}`,
  ...item,
  image: images[item.imageKey] || tempImg,
}));

const ExclusiveListings = () => {
  return (
    <div>
      <Layout />

      <div>
        <Hero2
          title="Exclusive Listings"
          description="Emma Ju features Bergen Counties property. Ju can find real estate in Alpine, Tenafly, Englewood Cliffs, NJ & more"
          showButton={false}
          backgroundImage="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
        />
      </div>

      <PropertyList properties={exclusiveProperties} />

      <div>
        <Hero
          subtitle="Manhattan, Fort Lee, Edgewater and Bergen county Licensed Realtor"
          title="CONNECT WITH EMMA"
          description="Emma Ju  Specializing in luxury real estate in Manhattan, Fort Lee, Edgewater and Bergen county new constructions."
          btnText="CONTACT EMMA"
          backgroundImage={connectWithUsImg}
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

export default ExclusiveListings;
