import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children, onLogout, navigateToPage, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <Header showSidebarToggle={true} onSidebarToggle={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden pt-16 pb-16">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          currentPage={currentPage}
          navigateToPage={navigateToPage}
          onLogout={onLogout}
        />
        
        {/* Main Content */}
        <main className={`flex-1 overflow-auto transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
