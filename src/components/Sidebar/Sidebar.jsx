// src/Components/Sidebar/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const SidebarContent = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowDropdown(false);
  };

  return (
    <div className="sidebar__content">
      <ul className="sidebar__nav">
        <li className="sidebar__nav-item">
          <Link to="/home" className="sidebar__nav-link" onClick={handleScrollToTop}>HOME</Link>
        </li>
        <li className="sidebar__nav-item">
          <Link to="/about" className="sidebar__nav-link" onClick={handleScrollToTop}>ABOUT EMMA</Link>
        </li>
        <li className="sidebar__nav-item">
          <Link to="/team" className="sidebar__nav-link" onClick={handleScrollToTop}>TEAM</Link>
        </li>

        <li className="sidebar__nav-item">
          <span
            className="sidebar__nav-link sidebar__dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            PROPERTIES
            <span className={`caret-icon ${showDropdown ? 'rotate' : ''}`}>▾</span>
          </span>
          {showDropdown && (
            <ul className="sidebar__dropdown">
              <li>
                <Link
                  to="/properties/exclusivelist"
                  className="sidebar__dropdown-link"
                  onClick={handleScrollToTop}
                >
                  Exclusive Listings
                </Link>
              </li>
              <li>
                <Link
                  to="/properties/featuredlist"
                  className="sidebar__dropdown-link"
                  onClick={handleScrollToTop}
                >
                  Featured Leases
                </Link>
              </li>
              <li>
                <Link
                  to="/properties/soldlist"
                  className="sidebar__dropdown-link"
                  onClick={handleScrollToTop}
                >
                  Sold Listings
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* <li className="sidebar__nav-item">
          <Link to="/social" className="sidebar__nav-link" onClick={handleScrollToTop}>SOCIAL</Link>
        </li>
        <li className="sidebar__nav-item">
          <Link to="/neighborhoods" className="sidebar__nav-link" onClick={handleScrollToTop}>COMMUNITIES</Link>
        </li> */}
      </ul>
    </div>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar__close" aria-label="Close sidebar" onClick={() => setIsOpen(false)}>
        &#10005;
      </button>
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
