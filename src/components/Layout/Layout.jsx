// Layout.jsx
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
};

export default Layout;
