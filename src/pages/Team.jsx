import React from 'react'
import Layout from '../Components/Layout/Layout.jsx'
import ContactFormPopup from '../Components/ContactFormPopup/ContactFormPopup.jsx'
import Hero from '../Components/Hero/Hero.jsx';
import Hero2 from '../Components/Hero2/Hero2.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import AgentCard from '../Components/AgentCard/AgentCard.jsx';
import pfpTemp from '../assets/connectwithus.jpg';
import './Team.css';

function Team() {
  return (
    <div>
      <Layout/>

      <Hero2
        title="Meet the Team"
        backgroundImage ="https://media-production.lp-cdn.com/cdn-cgi/image/format=auto,quality=85,fit=scale-down,width=2560/https://media-production.lp-cdn.com/media/mxxjbeckbidzmuygjbph"
        description="Learn about the exclusive neighborhoods in Los Angeles and Beverly Hills."
        showButton={false}
      />

      <div className='container-type4'>
        <div className="lead-agent-wrapper">
          <AgentCard image='https://images.pexels.com/photos/7693223/pexels-photo-7693223.jpeg' name="Jessica Liu" label="Team Leader" />
        </div>
        <div className="team-grid">
          <AgentCard image='https://images.pexels.com/photos/33109594/pexels-photo-33109594.jpeg' name="Jeffery" label="Licensed Real Estate Salesperson" />
          <AgentCard image='https://images.pexels.com/photos/5971254/pexels-photo-5971254.jpeg' name="Rita" label="Licensed Real Estate Salesperson" />
          <AgentCard image='https://images.pexels.com/photos/33100431/pexels-photo-33100431.jpeg' name="Jason He" label="Licensed Real Estate Salesperson" />
          <AgentCard image='https://images.pexels.com/photos/10041233/pexels-photo-10041233.jpeg' name="Jenny" label="Licensed Real Estate Salesperson" />
          <AgentCard image='https://images.pexels.com/photos/7504785/pexels-photo-7504785.jpeg' name="Jose Gonzalez" label="Licensed Real Estate Salesperson" />
          <AgentCard image='https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg' name="Lena" label="Licensed Real Estate Salesperson" />
        </div>
      </div>
      

      <ContactFormPopup/>

      <Hero
        subtitle="New Jersey & New York Licensed Realtor"
        title="CONNECT WITH EMMA"
        description="Emma specializes in Bergen County NJ and NYC buyers, sellers, and renters."
        btnText="CONTACT EMMA"
        backgroundImage='https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg'
        height="700px"
      />

      <div className='container-type1'>
        <Footer/>
      </div> */

    </div>
  )
}

export default Team
