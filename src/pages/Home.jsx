import React from "react";
import AgentProfile from "../Components/AgentProfile/agentprofile.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Hero_2 from "../Components/Hero2/Hero2.jsx";
import Communities from "../Components/Communities/Communities.jsx";
import Programs from "../Components/Programs/Programs.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import Layout from "../Components/Layout/Layout.jsx";
import VideoWrapper from "../Components/VideoWrapper/VideoWrapper.jsx";
import CompanyStats from "../Components/CompanyStats/CompanyStats.jsx";
import FeatureGrid from "../Components/FeatureGrid/FeatureGrid.jsx";
import ServicesSection from "../Components/ServicesSection/ServicesSection.jsx";
import CommunitiesGrid from "../Components/CommunitiesGrid/CommunitiesGrid.jsx";
import SplitSection1 from "../Components/SplitSection1/SplitSection1.jsx";
import connectWithUsImg from "../assets/connectwithus.jpg";
import ExclusiveListings from "../Components/ExclusiveListings/ExlcusiveListings.jsx";
import HomeValuation from "../Components/HomeValuation/HomeValuation.jsx";
import ChatBot from "../Components/ChatBot/ChatBot.jsx";
import ContactFormPopup from "../Components/ContactFormPopup/ContactFormPopup.jsx";
import Testimonials from "../components/Testimonials/Testimonials.jsx";

const Home = () => {
  return (
    <div>
      <Layout />
      <VideoWrapper />
      <div className="container-type1">
        <AgentProfile />
      </div>
      {/* <CompanyStats /> */}
      {/* <CommunitiesGrid/> */}
      <ServicesSection />
      {/* <div className="container-type2">
      <SplitSection1/>
      </div> */}
      <div className="container-type2">
        <ExclusiveListings />
      </div>

      <Testimonials />

      {/*<HomeValuation/>*/}
      <div>
        <Hero
          subtitle="New York City and New Jersey Licensed Realtor"
          title="CONNECT WITH EMMA"
          description="Emma specializes in representing buyers and sellers in Manhattan, Bergen county and along the NJ Gold Coast."
          btnText="CONTACT EMMA"
          backgroundImage="https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg"
          height="700px"
        />
      </div>
      {/* <ChatBot/> */}
      <ContactFormPopup />

      {/*<Hero_2 /> <div className="container-type2">
       <Programs />
       </div>*/}
      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
