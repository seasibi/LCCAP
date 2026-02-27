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
    <div className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-48 bg-green-800 text-white flex flex-col transition-all duration-300 z-50 ${
      isOpen ? 'translate-x-0' : '-translate-x-48'
    }`}>
      <div className="h-full flex flex-col">
        <div className="flex-1 py-6 overflow-y-auto">
          {/* Navigation Menu */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-white/15 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
                onClick={() => handleNavigation(item.id)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
