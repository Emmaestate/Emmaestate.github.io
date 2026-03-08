import React from 'react';
import SplitSection from '../SplitSection/SplitSection.jsx';
import bannerImg from '../../assets/Rent.jpg';

const AboutSection = () => {
  const subtext = (
    <div className="paragraphs">
      <p>
        Construction is underway for 1800 Avenue at Port Imperial, a luxury waterfront development in Weehawken by WHK Waterfront Urban Renewal LLC. Designed by Handel Architects, the 282-unit complex will feature floor-to-ceiling glass, panoramic NYC skyline views, and 45,000+ square feet of amenities, including pools, a fitness center, basketball courts, golf simulators, and a private screening room.
      </p>
      <p>
        Plaza Construction is leading the project, set for completion in summer 2026.
      </p>
      <p>
        Jessica Williams of Christie’s International Real Estate Group is the exclusive lead sales and marketing agent for 1800 Weehawken.
      </p>
    </div>
  );

  return (
    <SplitSection
      image={bannerImg}
      heading="Construction Begins on 1800 Weehawken"
      subtext={subtext}
      imagePosition="left"
    >
      <button className="btn">Learn More</button>
    </SplitSection>
  );
};

export default AboutSection;
