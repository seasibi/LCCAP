import React, { useState } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';

export default function Dashboard({ onLogout, navigateToPage, sidebarOpen, toggleSidebar }) {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        // Auto-close sidebar on mobile
        if (sidebarOpen) {
          toggleSidebar();
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [sidebarOpen, toggleSidebar]);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Dashboard Header - Fixed at top */}
      <Header showSidebarToggle={true} onSidebarToggle={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Component */}
        <Sidebar 
          isOpen={sidebarOpen}
          onNavigate={navigateToPage}
          currentPage="dashboard"
          isMobile={isMobile}
          onClose={toggleSidebar}
        />

        {/* Main Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? 'ml-[220px]' : 'ml-0'
        }`}>
          {/* Empty State */}
          <div className="flex flex-col items-center justify-center h-full p-8">
            <div className="text-6xl mb-4 opacity-50">📊</div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Dashboard Cleared</h2>
            <p className="text-gray-500 text-center max-w-md">
              The dashboard has been temporarily cleared. Content will be restored soon.
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Footer - Below content */}
      <Footer />
    </div>
  );
}
