import React, { useState } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import '../../Dashboard.css';

export default function Dashboard({ onLogout, navigateToPage, sidebarOpen, toggleSidebar }) {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  // Calendar data
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date().getDate();
    const isCurrentMonth = currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square flex items-center justify-center">
          <span className="text-gray-400 text-xs"></span>
        </div>
      );
    }
    
    // Add days of the month with event markers
    for (let day = 1; day <= daysInMonth; day++) {
      const hasEvent = [5, 12, 18, 25].includes(day); // Sample event days
      const isToday = isCurrentMonth && day === today;
      
      days.push(
        <div 
          key={day} 
          className={`aspect-square flex items-center justify-center border rounded-lg cursor-pointer transition-all duration-200 text-xs relative
            ${isToday ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300'}`}
          onClick={() => setSelectedDate(day)}
        >
          {day}
          {hasEvent && (
            <div className="absolute bottom-1 w-1 h-1 bg-green-400 rounded-full"></div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Sample data for charts - simplified for Tailwind CSS
  const yearlyEmissions = [
    { year: '2020', actual: 45, target: 50, actualHeight: 'h-20', targetHeight: 'h-24' },
    { year: '2021', actual: 42, target: 48, actualHeight: 'h-18', targetHeight: 'h-20' },
    { year: '2022', actual: 38, target: 45, actualHeight: 'h-16', targetHeight: 'h-18' },
    { year: '2023', actual: 35, target: 42, actualHeight: 'h-14', targetHeight: 'h-16' },
    { year: '2024', actual: 32, target: 40, actualHeight: 'h-13', targetHeight: 'h-16' },
  ];

  const climateGoals = [
    { sector: 'Energy', current: 65, target: 80, currentHeight: 'h-20', targetHeight: 'h-24' },
    { sector: 'Transport', current: 45, target: 70, currentHeight: 'h-14', targetHeight: 'h-22' },
  ];

  return (
    <div className="dashboard-container">
      {/* Dashboard Header - Fixed at top */}
      <Header showSidebarToggle={true} onSidebarToggle={toggleSidebar} />
      
      <div className="flex">
        {/* Sidebar Component */}
        <Sidebar 
          isOpen={sidebarOpen}
          onNavigate={navigateToPage}
          currentPage="dashboard"
          isMobile={isMobile}
          onClose={toggleSidebar}
        />

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
          {/* Dashboard Grid - Two Column Layout */}
          <div className="dashboard-grid">
            {/* Left Column - Calendar */}
            <div className="calendar-container">
              <div className="calendar-header">
                <h2 className="calendar-title">
                  <span className="title-icon">📅</span>
                  Calendar
                </h2>
                <div className="calendar-controls">
                  <button 
                    className="calendar-prev-button"
                    onClick={() => navigateMonth('prev')}
                  >
                    <span className="text-xs font-bold">‹</span>
                  </button>
                  <span className="calendar-month">{monthNames[currentMonth]} {currentYear}</span>
                  <button 
                    className="calendar-next-button"
                    onClick={() => navigateMonth('next')}
                  >
                    <span className="text-xs font-bold">›</span>
                  </button>
                </div>
              </div>
              <div className="calendar-body">
                <div className="calendar-weekdays">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-weekday">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="calendar-days">
                  {generateCalendarDays()}
                </div>
              </div>
              <div className="calendar-footer">
                <div className="calendar-legend">
                  <div className="legend-item">
                    <div className="legend-color today"></div>
                    <span>Today</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color has-event"></div>
                    <span>Events</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Two Graphs Stacked */}
            <div className="charts-container">
              {/* Yearly Emissions Chart Container */}
              <div className="chart-container">
                <div className="chart-header">
                  <h2 className="chart-title">
                    <span className="title-icon">📈</span>
                    Yearly Emissions
                  </h2>
                  <select className="year-select">
                    <option>2024</option>
                    <option>2023</option>
                    <option>2022</option>
                  </select>
                  <div className="status-indicator on-track">On Track</div>
                </div>
                <div className="chart-body">
                  <div className="chart-bars">
                    {yearlyEmissions.map((data, index) => (
                      <div key={data.year} className="bar-group">
                        <div className="bar-container">
                          <div 
                            className="bar actual"
                            style={{ height: `${(data.actual / 50) * 100}%` }}
                            title={`Actual: ${data.actual} tons`}
                          ></div>
                          <div 
                            className="bar target"
                            style={{ height: `${(data.target / 50) * 100}%` }}
                            title={`Target: ${data.target} tons`}
                          ></div>
                        </div>
                        <div className="bar-label">{data.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chart-footer">
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color actual"></div>
                      <span>Actual</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color target"></div>
                      <span>Target</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Goals Progress Chart Container */}
              <div className="chart-container">
                <div className="chart-header">
                  <h2 className="chart-title">
                    <span className="title-icon">🌍</span>
                    2030 Climate Goals
                  </h2>
                  <div className="status-indicator warning">Needs Action</div>
                </div>
                <div className="chart-body">
                  <div className="chart-bars">
                    {climateGoals.map((goal, index) => (
                      <div key={goal.sector} className="bar-group">
                        <div className="bar-container">
                          <div 
                            className="bar current"
                            style={{ height: `${goal.current}%` }}
                            title={`Current: ${goal.current}%`}
                          ></div>
                          <div 
                            className="bar target-goal"
                            style={{ height: `${goal.target}%` }}
                            title={`Target: ${goal.target}%`}
                          ></div>
                        </div>
                        <div className="bar-label">{goal.sector}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chart-footer">
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color current"></div>
                      <span>Current Progress</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color target-goal"></div>
                      <span>2030 Target</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Footer */}
          <div className="dashboard-footer">
            <div className="footer-content">
              <div className="footer-logo">
                <span className="footer-icon">🌿</span>
                <div className="footer-text">
                  <h3>LCCAP Dashboard</h3>
                  <p>Low Carbon Climate Action Platform</p>
                </div>
              </div>
              <div className="footer-info">
                <div className="footer-item">
                  <span className="footer-icon">🌱</span>
                  <span>Carbon Neutral 2030</span>
                </div>
                <div className="footer-item">
                  <span className="footer-icon">📊</span>
                  <span>Real-time Monitoring</span>
                </div>
                <div className="footer-item">
                  <span className="footer-icon">🌍</span>
                  <span>Climate Action</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
