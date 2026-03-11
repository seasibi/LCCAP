import React, { useState } from 'react';
import { 
  FiHome, 
  FiCalendar, 
  FiFileText, 
  FiSettings, 
  FiChevronDown, 
  FiChevronRight,
  FiMenu,
  FiX
} from 'react-icons/fi';

const Sidebar = ({ isOpen, currentPage, navigateToPage }) => {
  const [pillarsExpanded, setPillarsExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pillarPageIds = [
    'food-security', 'water-sufficiency', 'ecological-stability', 
    'human-security', 'climate-smart-industries', 'sustainable-energy', 'knowledge-capacity'
  ];

  // Auto-expand pillars when a pillar page is active
  React.useEffect(() => {
    if (pillarPageIds.includes(currentPage)) {
      setPillarsExpanded(true);
    }
  }, [currentPage]);

  const menuItems = [
    {
      icon: FiHome,
      label: 'Dashboard',
      pageId: 'dashboard',
      href: '#dashboard'
    },
    {
      icon: FiCalendar,
      label: 'Events',
      pageId: 'calendar',
      href: '#events'
    },
    {
      icon: FiFileText,
      label: 'Reports',
      pageId: 'accomplishment',
      href: '#reports'
    },
    {
      icon: FiSettings,
      label: 'Administration',
      pageId: 'user-management',
      href: '#administration'
    }
  ];

  const lccapPillars = [
    { name: 'Food Security', pageId: 'food-security' },
    { name: 'Water Sufficiency', pageId: 'water-sufficiency' },
    { name: 'Ecological Stability', pageId: 'ecological-stability' },
    { name: 'Human Security', pageId: 'human-security' },
    { name: 'Climate-Smart Industries', pageId: 'climate-smart-industries' },
    { name: 'Sustainable Energy', pageId: 'sustainable-energy' },
    { name: 'Knowledge & Capacity', pageId: 'knowledge-capacity' }
  ];

  const togglePillars = () => {
    setPillarsExpanded(!pillarsExpanded);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        style={{ backgroundColor: '#2E7D32' }}
      >
        {mobileMenuOpen ? (
          <FiX className="text-white text-xl" />
        ) : (
          <FiMenu className="text-white text-xl" />
        )}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 bg-white shadow-xl lg:shadow-sm
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-0 lg:w-20'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: '#2E7D32' }}
                >
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                                {!isOpen && (
                  <div>
                    <h2 className="font-bold text-lg" style={{ color: '#2E7D32' }}>
                      LCCAP
                    </h2>
                    <p className="text-xs text-gray-600">Management System</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => {}}
                className="hidden lg:block p-1 rounded hover:bg-gray-100"
              >
                {isOpen ? (
                  <FiChevronDown className="text-gray-600" />
                ) : (
                  <FiChevronRight className="text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigateToPage(item.pageId)}
                className={`
                  flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${currentPage === item.pageId 
                    ? 'bg-green-50 text-green-700 border-l-4' 
                    : 'hover:bg-gray-50 text-gray-700'
                  }
                  ${!isOpen ? 'justify-center' : 'justify-start'}
                `}
                style={{ 
                  borderColor: currentPage === item.pageId ? '#2E7D32' : 'transparent',
                  color: currentPage === item.pageId ? '#2E7D32' : '#263238'
                }}
              >
                <item.icon className={`text-xl ${!isOpen ? '' : 'mr-3'}`} />
                                {!isOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            ))}

            {/* LCCAP Pillars */}
            <div className="pt-4">
              <button
                onClick={togglePillars}
                className={`
                  w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200
                  ${currentPage && pillarPageIds.includes(currentPage)
                    ? 'bg-green-50 text-green-700 border-l-4' 
                    : 'hover:bg-gray-50 text-gray-700'
                  }
                  ${!isOpen ? 'justify-center' : 'justify-between'}
                `}
                style={{ 
                  borderColor: currentPage && pillarPageIds.includes(currentPage) ? '#2E7D32' : 'transparent',
                  color: currentPage && pillarPageIds.includes(currentPage) ? '#2E7D32' : '#263238'
                }}
              >
                <div className="flex items-center">
                  <span className="text-xl mr-3">🌱</span>
                                  {!isOpen && (
                    <span className="font-medium">LCCAP Pillars</span>
                  )}
                </div>
                                {!isOpen && (
                  <FiChevronRight 
                    className={`text-sm transition-transform duration-200 ${
                      pillarsExpanded ? 'rotate-90' : ''
                    }`}
                  />
                )}
              </button>

              {pillarsExpanded && (
                <div className="mt-2 ml-8 space-y-1">
                  {lccapPillars.map((pillar, index) => (
                    <button
                      key={index}
                      onClick={() => navigateToPage(pillar.pageId)}
                      className={`
                        block w-full text-left px-3 py-1 text-sm rounded transition-colors duration-200
                        ${currentPage === pillar.pageId 
                          ? 'text-green-700 bg-green-50' 
                          : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                        }
                      `}
                    >
                      {pillar.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {!isCollapsed ? (
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  City Government of Baguio
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Environment Office
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-8 h-8 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xs font-bold">B</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
