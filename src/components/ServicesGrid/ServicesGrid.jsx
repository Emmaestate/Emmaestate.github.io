import React from "react";
import FeatureGrid from "../FeatureGrid/FeatureGrid.jsx";
import buy from "../../assets/Buy.jpg";
import sell from "../../assets/Sell.jpg";
import rent from "../../assets/Rent.jpg";

const serviceItems = [
  {
    image: rent,
    title: "RENT",
    subtext: "Find your next home →",
    src: "/properties/featuredlist",
  },
  {
    image: buy,
    title: "BUY",
    subtext: "See properties for sale →",
    src: "/properties/exclusivelist",
  },
  {
    image: sell,
    title: "SELL",
    subtext: "Get a free valuation →",
    src: "/properties/soldlist",
  },
];

const ServicesSection = () => <FeatureGrid items={serviceItems} />;

export default ServicesSection;
