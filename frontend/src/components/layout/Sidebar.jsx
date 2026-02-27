import React from 'react';

export default function Sidebar({ isOpen, onNavigate, currentPage, isMobile, onClose }) {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'accomplishment', label: 'Accomplishment', icon: '🏆' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'report-management', label: 'Reports', icon: '📋' },
    { id: 'user-management', label: 'Users', icon: '👥' },
  ];

  const handleNavigation = (pageId) => {
    onNavigate(pageId);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <div className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-[220px] bg-green-800 text-white flex flex-col transition-all duration-300 z-40 shadow-2xl ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="h-full flex flex-col">
        {/* Navigation Menu */}
        <nav className="flex-1 py-6 overflow-y-auto">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-all duration-200 ${
                currentPage === item.id
                  ? 'bg-green-700 text-white'
                  : 'hover:bg-green-700 text-white/80'
              }`}
              onClick={() => handleNavigation(item.id)}
            >
              <span className="text-lg w-5 text-center">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
