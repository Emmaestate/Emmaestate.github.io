// src/pages/About.jsx
import React from "react";
import Layout from "../Components/Layout/Layout.jsx";
import Hero2 from "../Components/Hero2/Hero2.jsx";
import AgentProfile2 from "../Components/AgentProfile/agentprofile2.jsx";
import TextContainer from "../Components/TextContainer/TextContainer.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import connectWithUsImg from "../assets/connectwithus.jpg";

function About() {
  return (
    <div>
      <Layout />

      <Hero2
        title="Emma Ju"
        backgroundImage="https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=2560/https://media-production.lp-cdn.com/media/mxxjbeckbidzmuygjbph"
        description="Specializing in luxury real estate in Manhattan, Fort Lee, Edgewater and Bergen county new constructions"
        showButton={false}
      />

      <div className="container-type4">
        <AgentProfile2 />
        <TextContainer
          title="GET TO KNOW ME"
          text={`
          Emma Ju is a real estate professional with Acre NY Realty and Acre NJ. With deep market knowledge and a reputation for trust and professionalism, she helps clients navigate both suburban and city transactions with ease.

          Fluent in English and Mandarin, Emma works with a diverse range of buyers, sellers, and investors. Her client-first approach, clear communication, and dedication to long-term relationships make her a standout guide in today’s competitive real estate market.`}
        />
      </div>

      <Hero
        subtitle="New Jersey & New York Licensed Realtor"
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

export default About;
