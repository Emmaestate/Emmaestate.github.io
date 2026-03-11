import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import ExclusiveListings from "./pages/ExclusiveListings.jsx";
import FeaturedListings from "./pages/FeaturedListings.jsx";
import SoldListings from "./pages/SoldListings.jsx";
import Neighborhoods from "./pages/Neighborhoods.jsx";
// import NeighborhoodPage from './pages/NeighborhoodPage.jsx';
import About from "./pages/About.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import Team from "./pages/Team.jsx";
import Social from "./pages/Social.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import PropertyDetail from "./pages/PropertyDetail/PropertyDetail.jsx";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Routes with Layout */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/properties/exclusivelist"
          element={<ExclusiveListings />}
        />
        <Route path="/properties/featuredlist" element={<FeaturedListings />} />
        <Route path="/properties/soldlist" element={<SoldListings />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/neighborhoods" element={<Neighborhoods />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/neighborhoods/:path" element={<NeighborhoodPage />} /> */}
        <Route path="/team" element={<Team />} />
        <Route path="/social" element={<Social />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Routes WITHOUT Layout (like Contact) */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
