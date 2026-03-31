// Layout.jsx
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import ScrollDownButton from '../ScrollDownButton/ScrollDownButton.jsx';
import I18nAuditor from '../../i18n/I18nAuditor.jsx';
import FloatingContactButton from '../FloatingContactButton/FloatingContactButton.jsx';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <ScrollDownButton />
      <I18nAuditor />
      <FloatingContactButton />
    </>
  );
};

export default Layout;
