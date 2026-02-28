import React, { useState, useEffect } from 'react';

const Dashboard = ({ onLogout, navigateToPage, sidebarOpen, toggleSidebar }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample data for graphs
  const yearlyData = [
    { year: 2019, accomplishments: 45 },
    { year: 2020, accomplishments: 62 },
    { year: 2021, accomplishments: 78 },
    { year: 2022, accomplishments: 89 },
    { year: 2023, accomplishments: 95 },
    { year: 2024, accomplishments: 112 }
  ];

  const targetData = [
    { category: 'Climate Adaptation', current: 65, target: 100 },
    { category: 'Mitigation', current: 78, target: 100 },
    { category: 'Resilience', current: 52, target: 100 },
    { category: 'Sustainability', current: 71, target: 100 }
  ];

  // Sample events for calendar
  const events = {
    '2024-02-15': 'Climate Action Planning',
    '2024-02-20': 'Stakeholder Meeting',
    '2024-02-25': 'Progress Review',
    '2024-03-01': 'Target Assessment',
    '2024-03-10': 'Annual Report Due'
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const hasEvent = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events[dateStr];
  };

  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-green-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-green-700 font-bold text-xl">LCC</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">LCCAP</h1>
              <p className="text-green-200 text-xs">Climate Action Plan</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigateToPage('dashboard')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-600 w-full text-left"
              >
                <span className="text-lg">📊</span>
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToPage('accomplishment')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-600 transition-colors w-full text-left"
              >
                <span className="text-lg">🏆</span>
                <span>Accomplishment</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToPage('calendar')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-600 transition-colors w-full text-left"
              >
                <span className="text-lg">📅</span>
                <span>Calendar</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateToPage('report-management')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-600 transition-colors w-full text-left"
              >
                <span className="text-lg">📋</span>
                <span>Report Management</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-700 font-bold text-xs">👤</span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-800">Camille Cardenas</h2>
                <p className="text-xs text-gray-600">Administrator</p>
              </div>
            </div>
            <div className="bg-green-100 px-3 py-1 rounded-full">
              <span className="text-green-800 font-medium text-xs">Greetings! Camille</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content - 2 Column Layout */}
        <div className="flex-1 p-1 overflow-hidden">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-1">
            {/* Left Column - Calendar */}
            <div className="bg-white rounded-lg shadow p-2 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800 mb-1">Calendar</h3>
              
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between mb-1">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-gray-600 text-xs">◀</span>
                </button>
                <h4 className="text-sm font-semibold text-gray-700">
                  {currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </h4>
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="text-gray-600 text-xs">▶</span>
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-xs font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {generateCalendarDays().map((day, index) => (
                    <div
                      key={index}
                      onClick={() => handleDateClick(day)}
                      className={`
                        relative p-2 text-sm cursor-pointer rounded-lg transition-colors
                        ${day ? 'hover:bg-green-50' : ''}
                        ${selectedDate === day ? 'bg-green-500 text-white' : ''}
                        ${hasEvent(day) && selectedDate !== day ? 'bg-green-100 text-green-800' : ''}
                        ${!day ? 'text-gray-300' : 'text-gray-700'}
                      `}
                    >
                      {day}
                      {hasEvent(day) && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Display */}
              {selectedDate && hasEvent(selectedDate) && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-semibold text-green-800">
                    {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-sm text-green-700">{hasEvent(selectedDate)}</p>
                </div>
              )}
            </div>

            {/* Right Column - Graphs */}
            <div className="flex flex-col gap-1">
              {/* Yearly Accomplishments Graph */}
              <div className="bg-white rounded-lg shadow p-2 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-1">Yearly Accomplishments</h3>
                
                <div className="flex-1 flex items-end justify-between gap-1">
                  {yearlyData.map((data, index) => (
                    <div key={data.year} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-green-500 rounded-t relative group cursor-pointer hover:bg-green-600 transition-colors"
                           style={{ height: `${(data.accomplishments / 120) * 100}%` }}>
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.accomplishments}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">{data.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2030 Target Graph */}
              <div className="bg-white rounded-lg shadow p-2 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-1">Progress Toward 2030 Target</h3>
                
                <div className="flex-1 flex flex-col justify-center gap-1">
                  {targetData.map((item, index) => (
                    <div key={item.category} className="flex items-center gap-1">
                      <div className="w-24 text-xs text-gray-700 truncate">{item.category}</div>
                      <div className="flex-1 relative">
                        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full transition-all duration-500"
                               style={{ width: `${item.current}%` }}>
                          </div>
                        </div>
                        <div className="absolute right-0 top-0 h-4 w-4 bg-gray-300 rounded-full border border-white flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-700">{item.target}%</span>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-green-700 w-10 text-right">{item.current}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
