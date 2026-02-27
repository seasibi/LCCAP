import React from 'react';
import baguioLogo from '../../assets/images/baguio-logo.png';

const Header = ({ title, showSidebarToggle = false, onSidebarToggle = null, minimal = false }) => {
  if (minimal) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-gradient-to-r from-green-700 to-green-600 text-white px-4 flex justify-between items-center shadow-lg border-2 border-green-400/40 border-b-4 border-green-400/60">
        <div className="flex justify-between items-center w-full max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3">
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
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-16 bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex justify-between items-center shadow-lg border-2 border-green-400/40 border-b-4 border-green-400/60">
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          {showSidebarToggle && (
            <button 
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-300 flex items-center justify-center text-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
              onClick={onSidebarToggle}
            >
              <span>☰</span>
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
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95">
              <span className="text-base">👤</span>
              <span className="hidden sm:inline whitespace-nowrap">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
