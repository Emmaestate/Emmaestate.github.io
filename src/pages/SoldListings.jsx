import React from "react";
import Layout from "../Components/Layout/Layout.jsx";
import connectWithUsImg from "../assets/connectwithus.jpg";
import ContactFormPopup from "../Components/ContactFormPopup/ContactFormPopup.jsx";
import PropertyList from "../Components/PropertyList/PropertyList.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Hero2 from "../Components/Hero2/Hero2.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import soldData from "../data/soldListings.json";
import { images } from "../data/images";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import soldConfig from "../config/pages/Sold.config.js";
import soldBannerImg from "../assets/sold_banner.jpg";
import connectBannerImg from "../assets/connect_banner.jpeg";
// Transform data to match PropertyList expected format
// Add prefix to ID to avoid collisions
const soldProperties = soldData.map((item) => ({
  id: `sold-${item.id}`,
  image: images[item.imageKey] || "https://via.placeholder.com/400x300",
  price: item.price,
  address: item.address,
  bedrooms: item.bedrooms,
  bathrooms: item.bathrooms,
  sqft: item.sqft || "N/A",
}));

const SoldListings = () => {
  const { lang } = useLanguage();
  return (
    <div>
      <Layout />

      <div>
        <Hero2
          title={soldConfig.hero2.title[lang]}
          description={soldConfig.hero2.description[lang]}
          showButton={false}
          backgroundImage={soldBannerImg}
        />
      </div>

      <PropertyList properties={soldProperties} />

      <div>
        <Hero
          subtitle={soldConfig.contactHero.subtitle[lang]}
          title={soldConfig.contactHero.title[lang]}
          description={soldConfig.contactHero.description[lang]}
          btnText={soldConfig.contactHero.btnText[lang]}
          backgroundImage={connectBannerImg}
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

export default SoldListings;
