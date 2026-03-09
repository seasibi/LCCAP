import React from 'react';
import { navigationItems } from '../../router/RouteConfig';

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const AccomplishmentIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ReportIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v7m3-2h6l-1-1H9l-1 1z" />
  </svg>
);

const UserManagementIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const DataManagementIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LeafIcon = () => (
  <svg
  className="w-5 h-5"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 21c10 0 14-6 14-14C11 7 7 11 7 17c0 2 1 4 2 4"
  />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 21c4-4 8-8 14-14"
  />
</svg>
);

const WaterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

const TreeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const FolderIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const getIcon = (iconName) => {
  switch (iconName) {
    case '📊': return <DashboardIcon />;
    case '🏆': return <AccomplishmentIcon />;
    case '📅': return <CalendarIcon />;
    case '📋': return <ReportIcon />;
    case '👥': return <UserManagementIcon />;
    case '🗃️': return <DataManagementIcon />;
    default: return <DashboardIcon />;
  }
};

const Sidebar = ({ isOpen, currentPage, navigateToPage, onLogout }) => {
  const handleNavigation = (page) => {
    if (navigateToPage) {
      navigateToPage(page);
    }
  };

  const handlePillarNavigation = (pillarPath) => {
    if (navigateToPage) {
      navigateToPage(pillarPath);
    }
  };

  return (
    <div className={`w-64 bg-white border-r border-green-200 flex flex-col transition-all duration-300 shadow-lg ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed top-16 left-0 h-full z-40`}>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main Navigation</h3>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left group ${
                    currentPage === item.id 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <span className={`w-5 h-5 transition-colors duration-200 flex-shrink-0 ${
                    currentPage === item.id ? 'text-white' : 'text-gray-500 group-hover:text-green-600'
                  }`}>
                    {getIcon(item.icon)}
                  </span>
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    currentPage === item.id ? 'text-white' : 'text-gray-700 group-hover:text-green-700'
                  }`}>
                    {item.label}
                  </span>
                  {currentPage === item.id && (
                    <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Pillars Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Environmental Pillars</h3>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => handlePillarNavigation('/food-security')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-green-50 hover:text-green-700 group"
              >
                <span className="w-5 h-5 text-gray-500 group-hover:text-green-600 flex-shrink-0">
                  <LeafIcon />
                </span>
                <span className="text-sm font-medium">Food Security</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePillarNavigation('/water-sufficiency')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-green-50 hover:text-green-700 group"
              >
                <span className="w-5 h-5 text-gray-500 group-hover:text-green-600 flex-shrink-0">
                  <WaterIcon />
                </span>
                <span className="text-sm font-medium">Water Sufficiency</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePillarNavigation('/ecological-stability')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-green-50 hover:text-green-700 group"
              >
                <span className="w-5 h-5 text-gray-500 group-hover:text-green-600 flex-shrink-0">
                  <TreeIcon />
                </span>
                <span className="text-sm font-medium">Ecological Stability</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePillarNavigation('/human-security')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-green-50 hover:text-green-700 group"
              >
                <span className="w-5 h-5 text-gray-500 group-hover:text-green-600 flex-shrink-0">
                  <ShieldIcon />
                </span>
                <span className="text-sm font-medium">Human Security</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePillarNavigation('/climate-smart-industries')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-green-50 hover:text-green-700 group"
              >
                <span className="w-5 h-5 text-gray-500 group-hover:text-green-600 flex-shrink-0">
                  <FactoryIcon />
                </span>
                <span className="text-sm font-medium">Climate-Smart Industries</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePillarNavigation('/sustainable-energy')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-green-50 hover:text-green-700 group"
              >
                <span className="w-5 h-5 text-gray-500 group-hover:text-green-600 flex-shrink-0">
                  <LightningIcon />
                </span>
                <span className="text-sm font-medium">Sustainable Energy</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => handlePillarNavigation('/knowledge-capacity')}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-green-50 hover:text-green-700 group"
              >
                <span className="w-5 h-5 text-gray-500 group-hover:text-green-600 flex-shrink-0">
                  <BookIcon />
                </span>
                <span className="text-sm font-medium">Knowledge & Capacity</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="px-4 py-4 border-t border-green-100">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-700 group"
        >
          <span className="w-5 h-5 text-gray-500 group-hover:text-red-600 flex-shrink-0">
            <LogoutIcon />
          </span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
