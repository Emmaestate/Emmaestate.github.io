import React from "react";
import Layout from "../Components/Layout/Layout.jsx";
import connectWithUsImg from "../assets/connectwithus.jpg";
import ContactFormPopup from "../Components/ContactFormPopup/ContactFormPopup.jsx";
import NeighborhoodList from "../Components/NeighborhoodList/NeighborhoodList.jsx";
import Hero from "../Components/Hero/Hero.jsx";
import Hero2 from "../Components/Hero2/Hero2.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import tempImg from "../assets/connectwithus.jpg"; // Placeholder image for neighborhoods

const communities = [
  {
    id: "1",
    name: "Alpine",
    path: "alpine",
    image: tempImg,
    description:
      "A vibrant arts and dining scene meets rich history in Englewood Cliffs. From stately colonials to luxury condos, this town offers variety and vitality just 10 miles from Manhattan—perfect for buyers who want city access with a hometown feel.",
  },
  {
    id: "2",
    name: "Closter",
    path: "Closter",
    image: tempImg,
    description:
      "Closter offers a rare blend of scenic beauty, top-ranked schools, and a brand-new shopping plaza that keeps everything you need within reach. It’s ideal for buyers seeking peaceful living without compromising modern convenience.",
  },
  {
    id: "3",
    name: "Cliffside Park",
    path: "cliffsidepark",
    image: tempImg,
    description:
      "A vibrant arts and dining scene meets rich history in Englewood Cliffs. From stately colonials to luxury condos, this town offers variety and vitality just 10 miles from Manhattan—perfect for buyers who want city access with a hometown feel.",
  },
  {
    id: "4",
    name: "Cresskill",
    path: "cresskill",
    image: tempImg,
    description:
      "Cresskill boasts luxury estates, elite schools, and a quiet, upscale atmosphere. It’s a top Bergen County pick for buyers who value privacy, prestige, and proximity to top private schools and NYC.",
  },
  {
    id: "5",
    name: "Demarest",
    path: "demarest",
    image: tempImg,
    description:
      "A vibrant arts and dining scene meets rich history in Englewood Cliffs. From stately colonials to luxury condos, this town offers variety and vitality just 10 miles from Manhattan—perfect for buyers who want city access with a hometown feel.",
  },
  {
    id: "6",
    name: "Edgewater",
    path: "edgewater",
    image: tempImg,
    description:
      "Edgewater delivers a luxurious waterfront lifestyle with sweeping Manhattan views. From modern townhomes to sleek condos, this town attracts buyers seeking style, serenity, and convenience—all just minutes from the city.",
  },
  {
    id: "7",
    name: "Englewood Cliffs",
    path: "englewoodcliffs",
    image: tempImg,
    description:
      "A vibrant arts and dining scene meets rich history in Englewood Cliffs. From stately colonials to luxury condos, this town offers variety and vitality just 10 miles from Manhattan—perfect for buyers who want city access with a hometown feel.",
  },
  {
    id: "8",
    name: "Fort Lee",
    path: "fortlee",
    image: tempImg,
    description:
      "Perched along the Hudson River, Fort Lee offers stunning NYC skyline views, luxury high-rises, and a diverse dining scene. With easy access to Manhattan and a thriving local culture, it’s a dream spot for commuters and cosmopolitan buyers alike.",
  },
  {
    id: "9",
    name: "Jersey City",
    image: tempImg,
    description:
      "A booming urban center across from Lower Manhattan, Jersey City offers stunning waterfront living, a dynamic arts scene, and unbeatable transit access. From high-rise condos to historic brownstones, it’s a magnet for buyers who want it all—culture, convenience, and equity.",
  },
  {
    id: "10",
    name: "Leonia",
    path: "leonia",
    image: tempImg,
    description:
      "Leonia is a hidden gem with a creative spirit and unbeatable proximity to NYC. Known for its historic homes and arts-friendly vibe, this tight-knit town is perfect for buyers craving charm and community near the city.",
  },
  {
    id: "11",
    name: "Palisades Park",
    path: "palisadespark",
    image: tempImg,
    description:
      "Known for its vibrant Korean-American community, Palisades Park offers excellent food, culture, and investment potential. It’s a hotspot for buyers who want a city-adjacent lifestyle in a growing market.",
  },
  {
    id: "12",
    name: "Paramus",
    path: "paramus",
    image: tempImg,
    description:
      "With low property taxes, exceptional shopping, and an easy commute to NYC, Paramus offers serious value for buyers. The mix of suburban comfort and commercial convenience makes it one of the smartest investments in Bergen County.",
  },
  {
    id: "13",
    name: "Ridgewood",
    path: "ridgewood",
    image: tempImg,
    description:
      "Ridgewood blends prestige with charm, featuring a storybook downtown, award-winning schools, and commuter-friendly NJ Transit options. It’s a sought-after village for buyers looking for beauty, community, and lasting value.",
  },
  {
    id: "14",
    name: "Teaneck",
    path: "teaneck",
    image: tempImg,
    description:
      "A diverse, welcoming town with beautiful parks and strong schools, Teaneck offers buyers affordability and community just across the George Washington Bridge. It’s ideal for first-time homeowners and growing families alike.",
  },
  {
    id: "15",
    name: "Tenafly",
    path: "tenafly",
    image: tempImg,
    description:
      "Known for its elite public schools and peaceful charm, Tenafly is a top choice for families seeking suburban sophistication. Stately homes, tree-lined streets, and a quaint downtown create a tranquil, upscale living experience just minutes from the city.",
  },
];

const Neighborhoods = () => {
  return (
    <div>
      <Layout />

      <Hero2
        title="Neighborhood Guides"
        description="Learn about the exclusive neighborhoods in Los Angeles and Beverly Hills."
        showButton={false}
        backgroundImage="https://images.pexels.com/photos/681347/pexels-photo-681347.jpeg"
      />

      <NeighborhoodList neighborhoods={communities} />

      <Hero
        subtitle=""
        title="WORK WITH US"
        description="Specializing in Manhattan and Bergen County, New Jersey, we provide expert representation for buyers, sellers, and renters."
        btnText="CONTACT US"
        backgroundImage="https://images.pexels.com/photos/87378/pexels-photo-87378.jpeg"
        height="700px"
      />

      <ContactFormPopup />

      <div className="container-type1">
        <Footer />
      </div>
    </div>
  );
};

export default Neighborhoods;
