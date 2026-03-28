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
import "./Team.css";

function Team() {
  const leader = teamData.find(member => member.name.includes("Emma"));
  const teamMembers = teamData.filter(member => !member.name.includes("Emma"));
  const importedImages = import.meta.glob("../../source/team/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  });
  const imageLookup = Object.fromEntries(
    Object.entries(importedImages).map(([fullPath, url]) => {
      const file = fullPath.split("/").pop() || "";
      const base = file.replace(/\.[^/.]+$/, "").toLowerCase();
      return [base, url];
    })
  );
  const resolveMemberImage = (name) => {
    const key = (name || "").trim().toLowerCase();
    return imageLookup[key] || placeholder_image;
  };

  return (
    <div>
      <Layout />
      <Hero2
        title="Meet the Team"
        backgroundImage={aboutHeroImg}
        description="Learn about the exclusive neighborhoods in Los Angeles and Beverly Hills."
        showButton={false}
      />
      <div className="container-type4">
        {leader && (
          <div className="lead-agent-wrapper">
            <AgentCard
              image={imageLookup[(leader.name || "").trim().toLowerCase()] || emma_image}
              name={leader.name}
              label={leader.label}
              description={leader.description}
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
              label={member.label}
              description={member.description}
              email={member.email}
              phone={member.phone}
            />
          ))}
        </div>
      </div>
      <ContactFormPopup />
      <Hero
        subtitle="Manhattan, Fort Lee, Edgewater and Bergen county Licensed Realtor"
        title="CONNECT WITH EMMA"
        description="Emma specializes in Bergen County NJ and NYC buyers, sellers, and renters."
        btnText="CONTACT EMMA"
        backgroundImage="https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg"
        height="700px"
      />
      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
}

export default Team;
