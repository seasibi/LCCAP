import React from 'react';

const LeafIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
  </svg>
);

const PlantIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Footer = ({ minimal = false }) => {
  if (minimal) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 text-center p-5 z-5 bg-transparent">
        <div className="flex items-center justify-center gap-5 text-white/80 text-sm">
          <LeafIcon />
          <span>© 2026 City Environment and Parks Management Office</span>
          <LeafIcon />
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-700 to-green-600 text-white p-4 z-50 shadow-lg border-2 border-green-400/40 border-t-4 border-green-400/60">
      <div className="flex justify-between items-center w-full">
        {/* Left - Logo and Title */}
        <div className="flex items-center gap-3 ml-4">
          <div className="text-xl bg-white/10 p-2 rounded-full flex items-center justify-center w-10 h-10 shadow-md flex-shrink-0">
            <LeafIcon />
          </div>
          <div>
            <h3 className="font-semibold text-white/95 text-sm">LCCAP Dashboard</h3>
            <p className="text-xs text-white/80">Low Carbon Climate Action Platform</p>
          </div>
        </div>

        {/* Center - Info Items */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:bg-white/10 px-3 py-2 rounded-lg">
            <PlantIcon />
            <span>Carbon Neutral 2030</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:bg-white/10 px-3 py-2 rounded-lg">
            <ChartIcon />
            <span>Real-time Monitoring</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:bg-white/10 px-3 py-2 rounded-lg">
            <GlobeIcon />
            <span>Climate Action</span>
          </div>
        </div>

        {/* Right - Copyright */}
        <div className="text-xs text-white/70 mr-4">
          © 2026 CEPMO - All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
