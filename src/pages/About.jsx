// src/pages/About.jsx
import React from "react";
import Layout from "../Components/Layout/Layout.jsx";
import Hero2 from "../Components/Hero2/Hero2.jsx";
import AgentProfile2 from "../Components/AgentProfile/agentprofile2.jsx";
import TextContainer from "../Components/TextContainer/TextContainer.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import connectWithUsImg from "../assets/connectwithus.jpg";
import aboutHeroImg from "../assets/about1.webp";
import ContactFormPopup from "../Components/ContactFormPopup/ContactFormPopup.jsx";
import YoutubeFeed from "../components/YoutubeFeed/YoutubeFeed.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import aboutConfig from "../config/pages/About.config.js";

function About() {
  const { lang } = useLanguage();
  return (
    <div>
      <Layout />

      <Hero2
        title={aboutConfig.hero2.title[lang]}
        backgroundImage={aboutHeroImg}
        description={aboutConfig.hero2.description[lang]}
        showButton={false}
      />

      <div className="container-type4">
        <AgentProfile2 />
        <TextContainer
          title={aboutConfig.intro.title[lang]}
          text={aboutConfig.intro.text[lang]}
        />
      </div>

      <YoutubeFeed />

      <Hero
        subtitle={aboutConfig.contactHero.subtitle[lang]}
        title={aboutConfig.contactHero.title[lang]}
        description={aboutConfig.contactHero.description[lang]}
        btnText={aboutConfig.contactHero.btnText[lang]}
        backgroundImage="https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg"
        height="700px"
        onBtnClick={() => document.querySelector(".connect-btn").click()}
      />

      <ContactFormPopup />

      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
}

export default About;
