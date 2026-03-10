// src/Components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = ({ isOpen, setIsOpen }) => {
  const [sticky, setSticky] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowDropdown(false);
  };

  return (
    <header className={`header ${sticky ? 'dark-nav' : ''}`}>
      <div className="navbar-container">
        {/* Left Navigation */}
        <div className="nav-section left">
          <ul className="nav-list">
            <li 
              className="nav-item dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span className="nav-link">PROPERTIES ▾</span>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link
                    to="/properties/exclusivelist"
                    className="dropdown-link"
                    onClick={handleScrollToTop}
                  >
                    Our Exclusive Listings
                  </Link>
                  <Link
                    to="/properties/featuredlist"
                    className="dropdown-link"
                    onClick={handleScrollToTop}
                  >
                    Our Featured Leases
                  </Link>
                  <Link
                    to="/properties/soldlist"
                    className="dropdown-link"
                    onClick={handleScrollToTop}
                  >
                    Our Sold Listings
                  </Link>
                </div>
              )}
            </li>
            {/* <li className="nav-item">
              <span className="nav-link">HOME SEARCH</span>
            </li> */}
          </ul>
        </div>

        {/* Center Logo */}
        <div className="nav-logo">
          <Link to="/home" onClick={handleScrollToTop}>
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="nav-section right">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={handleScrollToTop}>Contact</Link>
            </li>
            <li className="nav-item">
              <a href="tel:1234567890" className="nav-link">(201)-742-1625</a>
            </li>
            <li className="nav-item hamburger-wrapper">
              <button className="hamburger" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
