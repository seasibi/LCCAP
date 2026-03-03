import React, { useState } from 'react';
import baguioLogo from '../../assets/images/baguio-logo.png';

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Header = ({ title, showSidebarToggle = false, onSidebarToggle = null, minimal = false, onLogout = null }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  if (minimal) {
    return (
      <header className="fixed top-0 left-0 right-0 z-60 w-full h-16 bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg border-2 border-green-400/40 border-b-4 border-green-400/60">
        <div className="flex items-center pl-4">
          <div className="text-xl bg-white/10 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-md flex-shrink-0">
            <img 
              src={baguioLogo} 
              alt="Baguio City Logo" 
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-0 text-white/95 shadow-sm">LCCAP</h1>
            <p className="text-xs mb-0 text-white/80 shadow-sm">Climate Action Platform</p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-60 w-full h-16 bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg border-2 border-green-400/40 border-b-4 border-green-400/60">
      <div className="flex justify-between items-center w-full h-full">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center gap-4 pl-4">
          {showSidebarToggle && (
            <button 
              className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
              onClick={onSidebarToggle}
            >
              <MenuIcon />
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="text-xl bg-white/10 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-md flex-shrink-0">
              <img 
                src={baguioLogo} 
                alt="Baguio City Logo" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold mb-0 text-white/95 shadow-sm">LCCAP Management</h1>
              <p className="text-xs mb-0 text-white/80 shadow-sm">Local Climate Change Action Plan</p>
            </div>
          </div>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center pr-4 relative">
          <div className="relative">
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="bg-white/20 hover:bg-white/30 px-5 py-3 rounded-xl transition-all duration-300 ease-in-out flex items-center gap-3 text-sm font-medium hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
            >
              <UserIcon />
              <span className="hidden sm:inline whitespace-nowrap">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
