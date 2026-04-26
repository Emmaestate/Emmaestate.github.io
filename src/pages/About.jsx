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
import YoutubeFeed from "../components/YoutubeFeed/YoutubeFeed.jsx";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import aboutConfig from "../config/pages/About.config.js";
import homeConfig from "../config/pages/Home.config.js";
import connectBannerImg from "../assets/connect_banner.jpeg";
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
      <Hero
        subtitle={homeConfig.homeHero.subtitle[lang]}
        title={homeConfig.homeHero.title[lang]}
        description={homeConfig.homeHero.description[lang]}
        btnText={homeConfig.homeHero.btnText[lang]}
        backgroundImage={connectBannerImg}
        height="700px"
      />

      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
}

export default About;

//  <YoutubeFeed
//     heading={aboutConfig.youtubeFeed.heading[lang]}
//     loadMoreText={aboutConfig.youtubeFeed.loadMore[lang]}
//     loadingText={aboutConfig.youtubeFeed.loading[lang]}
//   />
