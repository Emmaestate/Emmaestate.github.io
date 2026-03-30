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
import { useLanguage } from "../i18n/LanguageContext.jsx";
import exclusiveConfig from "../config/pages/Exclusive.config.js";

const exclusiveProperties = exclusiveData.map((item) => ({
  id: `exclusive-${item.id}`,
  ...item,
  image: images[item.imageKey] || tempImg,
}));

const ExclusiveListings = () => {
  const { lang } = useLanguage();
  return (
    <div>
      <Layout />

      <div>
        <Hero2
          title={exclusiveConfig.hero2.title[lang]}
          description={exclusiveConfig.hero2.description[lang]}
          showButton={false}
          backgroundImage="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg"
        />
      </div>

      <PropertyList properties={exclusiveProperties} />

      <div>
        <Hero
          subtitle={exclusiveConfig.contactHero.subtitle[lang]}
          title={exclusiveConfig.contactHero.title[lang]}
          description={exclusiveConfig.contactHero.description[lang]}
          btnText={exclusiveConfig.contactHero.btnText[lang]}
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
