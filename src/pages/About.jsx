// src/pages/About.jsx
import React from 'react';
import Layout from '../Components/Layout/Layout.jsx';
import Hero2 from '../Components/Hero2/Hero2.jsx';
import AgentProfile2 from '../Components/AgentProfile/agentprofile2.jsx';
import TextContainer from '../Components/TextContainer/TextContainer.jsx';
import Hero from '../Components/Hero/Hero.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import connectWithUsImg from '../assets/connectwithus.jpg';

function About() {
  return (
    <div>
      <Layout />

      <Hero2
        title="Emma Ju"
        backgroundImage ="https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=2560/https://media-production.lp-cdn.com/media/mxxjbeckbidzmuygjbph"
        description="Learn about the exclusive neighborhoods in Los Angeles and Beverly Hills."
        showButton={false}
      />

      <div className="container-type4">
        <AgentProfile2 />
        <TextContainer
          title="GET TO KNOW ME"
          text={`Jessica Williams is a Real Estate Agent Associate with more than 15 years of experience in the industry. She specializes in residential real estate and is known for her ability to market the finest homes on the New Jersey waterfront. As a top sales producer in New Jersey, Jessica possesses a stellar sales resume that capitalizes on her industry acumen and includes record sales in the region’s most exceptional communities – The Brownstones at Port Imperial, The Avenue Collection, Henley on Hudson, and Maxwell Place.

          Jessica drives an innovative business that serves as a catalyst for showcasing home values throughout the local and regional market. Her clientele is impressive, as she is highly regarded by professional athletes, notable business executives, and real estate collectors. Jessica builds trust with each and every client, making their interests the central focus of each and every transaction. This loyalty is often rewarded through repeat clients and extensive referrals, creating an ever-growing network of high-profile clientele with very similar real estate needs.

          Throughout her real estate career, Jessica has been recognized for her superior skill and performance with industry recognitions, including being a NJ REALTORS® Circle of Excellence Sales Award each year since 2014, reaching Platinum from 2016–2023.

          In her spare time, Jessica enjoys workout classes, and personal style, and fancies a nice Pinot Noir. She also loves spending time with her husband, Pete, and their four children: Preston, Rory, Lilliana, and Macy.`}
        />
      </div>

      <Hero
        subtitle="New Jersey & New York Licensed Realtor"
        title="CONNECT WITH EMMA"
        description="Emma specializes in Bergen County NJ and NYC buyers, sellers, and renters."
        btnText="CONTACT EMMA"
        backgroundImage='https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg'
        height="700px"
      />

      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
}

export default About;
