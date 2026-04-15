import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import ContactFormPopup from "../components/ContactFormPopup/ContactFormPopup.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Hero2 from "../components/Hero2/Hero2.jsx";
import Footer from "../components/Footer/Footer.jsx";
import aboutHeroImg from "../assets/about1.webp";
import AgentCard from "../components/AgentCard/AgentCard.jsx";
import emma_image from "../assets/emma.jpeg";
import placeholder_image from "../assets/placeholder.png";
import teamData from "../data/team.json";
import connectBannerImg from "../assets/connect_banner.jpeg";
import "./Team.css";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import teamConfig from "../config/pages/Team.config.js";

function Team() {
  const { lang } = useLanguage();
  const leader = teamData.find((member) => member.name.includes("Emma"));
  const teamMembers = teamData.filter(
    (member) => !member.name.includes("Emma"),
  );
  const importedImages = import.meta.glob(
    "../../source/team/*.{jpg,jpeg,png,webp}",
    {
      eager: true,
      import: "default",
    },
  );
  const imageLookup = Object.fromEntries(
    Object.entries(importedImages).map(([fullPath, url]) => {
      const file = fullPath.split("/").pop() || "";
      const base = file.replace(/\.[^/.]+$/, "").toLowerCase();
      return [base, url];
    }),
  );
  const resolveMemberImage = (name) => {
    const key = (name || "").trim().toLowerCase();
    return imageLookup[key] || placeholder_image;
  };

  return (
    <div>
      <Layout />
      <Hero2
        title={teamConfig.hero.title[lang]}
        backgroundImage={aboutHeroImg}
        description={""}
        showButton={false}
      />
      <div className="container-type4">
        {leader && (
          <div className="lead-agent-wrapper">
            <AgentCard
              image={
                imageLookup[(leader.name || "").trim().toLowerCase()] ||
                emma_image
              }
              name={leader.name}
              label={
                lang === "zh" && leader.label_zh
                  ? leader.label_zh
                  : leader.label
              }
              description={
                lang === "zh" && leader.description_zh
                  ? leader.description_zh
                  : leader.description
              }
              email={leader.email}
              phone={leader.phone}
            />
          </div>
        )}
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <AgentCard
              key={index}
              image={resolveMemberImage(member.name)}
              name={member.name}
              label={
                lang === "zh" && member.label_zh
                  ? member.label_zh
                  : member.label
              }
              description={
                lang === "zh" && member.description_zh
                  ? member.description_zh
                  : member.description
              }
              email={member.email}
              phone={member.phone}
            />
          ))}
        </div>
      </div>
      <ContactFormPopup />
      <Hero
        subtitle={teamConfig.contactHero.subtitle[lang]}
        title={teamConfig.contactHero.title[lang]}
        description={teamConfig.contactHero.description[lang]}
        btnText={teamConfig.contactHero.btnText[lang]}
        backgroundImage={connectBannerImg}
        height="700px"
      />
      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
}

export default Team;
