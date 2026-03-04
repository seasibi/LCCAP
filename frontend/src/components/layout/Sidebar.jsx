import React from 'react';
import { navigationItems } from '../../router/RouteConfig';

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const DocumentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const WaterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const TreeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const FactoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const getIcon = (iconName) => {
  switch (iconName) {
    case '📊': return <DashboardIcon />;
    case '🏆': return <TrophyIcon />;
    case '📅': return <CalendarIcon />;
    case '📋': return <DocumentIcon />;
    case '👥': return <UsersIcon />;
    default: return <DashboardIcon />;
  }
};

const Sidebar = ({ isOpen, currentPage, navigateToPage, onLogout }) => {
  const handleNavigation = (page) => {
    if (navigateToPage) {
      navigateToPage(page);
    }
  };

  return (
    <div className={`w-64 bg-green-700 text-white flex flex-col transition-all duration-300 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed top-16 left-0 h-full z-40 py-2`}>
      {/* Navigation Menu */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left ${
                  currentPage === item.id 
                    ? 'bg-white text-green-700' 
                    : 'bg-green-800 text-green-100 hover:bg-green-700'
                }`}
              >
                <span className={`w-5 h-5 transition-colors duration-200 ${
                  currentPage === item.id ? 'text-green-700' : 'text-green-100'
                }`}>
                  {getIcon(item.icon)}
                </span>
                <span className={`text-xs transition-colors duration-200 ${
                  currentPage === item.id ? 'text-green-700' : 'text-green-100'
                }`}>
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Pillars Section */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-green-200 uppercase tracking-wider mb-2">LCCAP Pillars</h3>
          <ul className="space-y-1">
            <li>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left bg-green-800 text-green-100 hover:bg-green-700">
                <LeafIcon />
                <span className="text-xs">Food Security</span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left bg-green-800 text-green-100 hover:bg-green-700">
                <WaterIcon />
                <span className="text-xs">Water Sufficiency</span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left bg-green-800 text-green-100 hover:bg-green-700">
                <TreeIcon />
                <span className="text-xs">Ecological Stability</span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left bg-green-800 text-green-100 hover:bg-green-700">
                <ShieldIcon />
                <span className="text-xs">Human Security</span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left bg-green-800 text-green-100 hover:bg-green-700">
                <FactoryIcon />
                <span className="text-xs">Climate-Smart Industries</span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left bg-green-800 text-green-100 hover:bg-green-700">
                <LightningIcon />
                <span className="text-xs">Sustainable Energy</span>
              </button>
            </li>
            <li>
              <button className="flex items-center gap-2 px-2 py-1.5 rounded transition-all duration-200 w-full text-left bg-green-800 text-green-100 hover:bg-green-700">
                <BookIcon />
                <span className="text-xs">Knowledge & Capacity</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
