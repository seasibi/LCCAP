import React, { useState, useEffect } from 'react';
import { FiCalendar, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { calendarEventsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { getTextClass, getStatisticsCardClasses } from '../../utils/styleUtils';

import Header from '../layout/Header';
import StatCard from '../StatCard';
import ProgressChart from '../ProgressChart';
import { lccapPillars } from '../../data/mockData';

import baguioLogo from '../../assets/images/baguio-logo.png';

const Dashboard = ({ onLogout, navigateToPage, sidebarOpen, toggleSidebar }) => {
  const { showWarning, showInfo } = useToast();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [allEvents, setAllEvents] = useState([]); // Store full event objects for color coding
  const [notificationsShown, setNotificationsShown] = useState(() => {
    const savedNotifications = localStorage.getItem('notificationsShown');
    return savedNotifications ? new Set(JSON.parse(savedNotifications)) : new Set();
  });
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [showMoveInterface, setShowMoveInterface] = useState(false);
  const [selectedMoveDate, setSelectedMoveDate] = useState(null);

  // Save notificationsShown to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notificationsShown', JSON.stringify(Array.from(notificationsShown)));
  }, [notificationsShown]);

  // Handle event move
  const handleMoveEvent = async (event, newDate) => {
    try {
      // Update original event status to "Moved"
      await calendarEventsAPI.update(event.id, {
        ...event,
        status: 'Moved'
      });

      // Create new event with same details but new date
      const newEventData = {
        event_name: event.event_name,
        date: newDate,
        duration: event.duration,
        pillar: event.pillar,
        office: event.office,
        status: 'Planned'
      };

      await calendarEventsAPI.create(newEventData);

      // Reload events to reflect changes
      const response = await calendarEventsAPI.getAll();
      setAllEvents(response.data);

      // Close modal
      closeEventModal();
      
      // Show success message (you could integrate with toast if available)
      console.log('Event moved successfully');
    } catch (error) {
      console.error('Error moving event:', error);
    }
  };

  // Handle event click to show details
  const handleEventClick = (event, day) => {
    setSelectedEventForModal(event);
    setIsEventModalOpen(true);
  };

  // Close event modal
  const closeEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEventForModal(null);
    setShowMoveInterface(false);
    setSelectedMoveDate(null);
  };

  // Get office initials
  const getOfficeInitials = (office) => {
    if (!office) return '';
    return office.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 3);
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Planned':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Ongoing':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'Completed':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'Moved':
        return (
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Get event color based on event ID for consistency across days
  const getEventColor = (event, isToday) => {
    if (isToday) {
      return {
        bg: 'bg-green-700',
        text: 'text-white',
        border: 'border-green-600'
      };
    }
    
    // Special handling for Moved events
    if (event.status === 'Moved') {
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-200',
        borderHex: '#ef4444'
      };
    }
    
    // Generate consistent color based on event ID
    const colorPalette = [
      { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200', borderHex: '#3b82f6' },
      { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200', borderHex: '#9333ea' },
      { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200', borderHex: '#ec4899' },
      { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200', borderHex: '#6366f1' },
      { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', borderHex: '#ef4444' },
      { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200', borderHex: '#f97316' },
      { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-200', borderHex: '#14b8a6' },
      { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-200', borderHex: '#06b6d4' }
    ];
    
    // Use event ID to consistently select the same color
    const colorIndex = event.id % colorPalette.length;
    return colorPalette[colorIndex];
  };

  // Get events for a specific date (for color coding)
  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return allEvents.filter(event => {
      // Check if event falls on this date (including multi-day events)
      if (event.date === dateStr) return true;
      
      // Check multi-day events
      if (event.duration) {
        let days = 1;
        
        // Parse duration
        if (event.duration.includes('days')) {
          days = parseInt(event.duration) || 1;
        } else if (event.duration.includes('week')) {
          days = (parseInt(event.duration) || 1) * 7;
        } else if (event.duration.includes('month')) {
          days = (parseInt(event.duration) || 1) * 30; // Approximate
        }
        
        const eventDate = new Date(event.date);
        const targetDate = new Date(dateStr);
        
        // Check if target date is within the event duration range
        for (let i = 0; i < days; i++) {
          const checkDate = new Date(eventDate);
          checkDate.setDate(eventDate.getDate() + i);
          if (checkDate.toDateString() === targetDate.toDateString()) {
            return true;
          }
        }
      }
      
      return false;
    });
  };

  // Load events from API on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        console.log('Dashboard: Loading events from API...');
        const response = await calendarEventsAPI.getAll();
        console.log('Dashboard: Loaded events from API:', response.data);
        setAllEvents(response.data);
      } catch (error) {
        console.error('Dashboard: Error loading events from API:', error);
      }
    };

    loadEvents();
  }, []);

  const getEventCount = (day) => {
    return getEventsForDate(day).length;
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date().getDate());
  };

  const resetNotifications = () => {
    setNotificationsShown(new Set());
  };

  const getEventStatistics = () => {
    const totalEvents = allEvents.length;
    const completedEvents = allEvents.filter(event => event.status === 'Completed').length;
    const ongoingEvents = allEvents.filter(event => event.status === 'Ongoing').length;
    const movedEvents = allEvents.filter(event => event.status === 'Moved').length;
    const plannedEvents = allEvents.filter(event => event.status === 'Planned').length;
    const thisMonthEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDate.getMonth() && 
             eventDate.getFullYear() === currentDate.getFullYear();
    }).length;
    const completionRate = totalEvents > 0 ? Math.round((completedEvents / totalEvents) * 100) : 0;

    return {
      totalEvents,
      completedEvents,
      ongoingEvents,
      movedEvents,
      plannedEvents,
      thisMonthEvents,
      completionRate
    };
  };

  const getCompletedEventsNeedingForms = () => {
    // Since accomplishment_submitted field doesn't exist in backend, return empty array
    // This functionality would need to be added to the backend model
    return [];
  };

  const getEventsReadyForExport = () => {
    // Since accomplishment_submitted field doesn't exist, return completed events
    return allEvents.filter(event => 
      event.status === 'Completed'
    );
  };

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
    
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of month
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

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <div>
          <h1 className={getTextClass('pageTitle')}>Dashboard</h1>
          <p className="text-gray-600 mt-1">Local Climate Change Action Plan Management</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="space-y-6">
        {/* First Level - Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            icon={FiCalendar}
            title="Total Events"
            value={getEventStatistics().totalEvents}
            subtitle="All recorded activities"
            color="#2E7D32"
          />
          <StatCard
            icon={FiCheckCircle}
            title="Completed Events"
            value={getEventStatistics().completedEvents}
            subtitle="Successfully finished"
            color="#66BB6A"
          />
        </div>

        {/* LCCAP Pillar Accomplishments */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-green-400">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">LCCAP Pillar Accomplishments</h3>
            <FiTrendingUp className="text-green-600 text-2xl" />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-green-400">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Pillar</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Total Events</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Completed</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">In Progress</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Progress</th>
                </tr>
              </thead>
              <tbody>
                {lccapPillars.map((pillar, index) => {
                  const pillarEvents = allEvents.filter(event => event.pillar === pillar.name);
                  const completedEvents = pillarEvents.filter(event => event.status === 'Completed').length;
                  const inProgressEvents = pillarEvents.filter(event => event.status === 'Ongoing').length;
                  const progress = pillarEvents.length > 0 ? Math.round((completedEvents / pillarEvents.length) * 100) : 0;
                  
                  return (
                    <tr key={index} className="border-b border-gray-200 hover:bg-green-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-3"
                            style={{ backgroundColor: pillar.color }}
                          ></div>
                          <span className="font-medium text-gray-800">{pillar.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4 text-gray-700">{pillarEvents.length}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{completedEvents}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{inProgressEvents}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <div className="w-full max-w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${progress}%`,
                                backgroundColor: progress >= 70 ? '#2E7D32' : progress >= 50 ? '#66BB6A' : '#FFA726'
                              }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{progress}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Second Level - Calendar and Side Panel */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Calendar */}
          <div className="flex-1">
            {/* Full Width Calendar */}
            <div className="bg-green-50 rounded-lg shadow-lg p-4 lg:p-6 border-2 border-green-400">
              {/* Enhanced Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-2 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm"
                    title="Previous month"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-2 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm"
                    title="Next month"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800">{formatMonthYear(currentDate)}</h2>
                  <p className="text-sm text-gray-500">Week {getWeekNumber(currentDate)}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={goToToday}
                    className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                  >
                    Today
                  </button>
                  <button
                    onClick={resetNotifications}
                    className="p-2 hover:bg-green-100 rounded-lg transition-all duration-200 hover:scale-105 shadow-sm"
                    title="Reset notifications"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Enhanced Calendar Grid */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {/* Enhanced Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <div key={day} className={`text-sm font-semibold py-2 rounded-lg border ${
                      index === 0 || index === 6 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : 'bg-green-100 text-green-800 border-green-300'
                    }`}>
                      {day}
                    </div>
                  ))}
                  
                  {/* Enhanced Calendar days */}
                  {generateCalendarDays().map((day, index) => {
                    const dayEvents = getEventsForDate(day);
                    const today = new Date();
                    const isToday = day && new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() === today.toDateString();
                    const isWeekend = index % 7 === 0 || index % 7 === 6;
                    const eventCount = getEventCount(day);
                    const hasEvents = eventCount > 0;
                    
                    return (
                      <div
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={`
                          relative p-2 cursor-pointer rounded-xl transition-all duration-200 min-h-[85px] border
                          ${!day ? 'bg-gray-50 border-gray-200 cursor-default' : ''}
                          ${day && !isToday && !isWeekend ? 'bg-white border-gray-300 hover:bg-green-50 hover:border-green-400 hover:shadow-md' : ''}
                          ${day && !isToday && isWeekend ? 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300' : ''}
                          ${isToday ? 'bg-green-500 text-white border-green-600 shadow-lg' : ''}
                          ${selectedDate === day && !isToday ? 'ring-2 ring-green-400 ring-offset-1' : ''}
                          ${hasEvents && !isToday ? 'font-semibold' : ''}
                        `}
                      >
                        <div className={`text-sm font-medium mb-1 ${isToday ? 'text-white' : isWeekend ? 'text-red-700' : 'text-gray-700'}`}>
                          {day}
                        </div>
                        
                        {/* Enhanced Event indicators */}
                        {day && hasEvents && (
                          <div className="space-y-1">
                            {/* Event count badge */}
                            {eventCount > 2 && (
                              <div className={`absolute top-1 right-1 text-xs px-1.5 py-0.5 rounded-full font-bold ${
                                isToday ? 'bg-white text-green-600' : 'bg-green-600 text-white'
                              }`}>
                                {eventCount}
                              </div>
                            )}
                            
                            {/* Color-coded event dots */}
                            <div className="flex justify-center gap-1">
                              {dayEvents.slice(0, 3).map((event, eventIndex) => {
                                const colors = getEventColor(event, isToday);
                                return (
                                  <div
                                    key={event.id}
                                    className={`w-1.5 h-1.5 rounded-full ${colors.bg} ${isToday ? 'ring-1 ring-white' : ''}`}
                                    title={event.event_name}
                                  />
                                );
                              })}
                              {eventCount > 3 && (
                                <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-gray-400'}`} />
                              )}
                            </div>
                            
                            {/* Event names (compact) */}
                            <div className="space-y-0.5">
                              {dayEvents.slice(0, 1).map((event, eventIndex) => {
                                const colors = getEventColor(event, isToday);
                                return (
                                  <div
                                    key={event.id}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEventClick(event, day);
                                    }}
                                    className={`text-xs truncate px-1 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity relative ${
                                      isToday ? 'bg-white/20 text-white' : colors.bg
                                    } ${isToday ? 'text-white' : colors.text}`}
                                    title={event.event_name}
                                  >
                                    <div className="flex items-center gap-1">
                                      <span className={`flex-shrink-0 ${isToday ? 'text-white' : 'text-gray-600'}`}>
                                        {getStatusIcon(event.status)}
                                      </span>
                                      <span className="truncate">{event.event_name}</span>
                                      {event.office && (
                                        <span className={`text-xs font-medium flex-shrink-0 ${isToday ? 'text-white/70' : 'text-gray-500'}`}>
                                          {getOfficeInitials(event.office)}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                              {eventCount > 1 && (
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDateClick(day);
                                  }}
                                  className={`text-xs px-1 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                    isToday ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                                  }`}
                                  title={`Click to see all ${eventCount} events`}
                                >
                                  +{eventCount - 1} more
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {/* Today indicator */}
                        {isToday && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Side - Legend and Event Details */}
          <div className="w-full lg:w-80 space-y-4">
            {/* Calendar Legend */}
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-400 shadow-sm">
              <h4 className="text-sm font-semibold text-green-700 mb-3">Calendar Legend</h4>
              <div className="flex flex-wrap gap-4 text-xs mb-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
                  <span className="text-gray-600">Weekend</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
                  <span className="text-gray-600">Event</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-600 text-white text-xs flex items-center justify-center rounded-full font-bold">3</div>
                  <span className="text-gray-600">3+ events</span>
                </div>
              </div>
              <div className="border-t border-green-300 pt-3">
                <p className="text-xs font-semibold text-green-700 mb-2">Status Icons:</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">{getStatusIcon('Planned')}</span>
                    <span className="text-gray-600">Planned</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">{getStatusIcon('Ongoing')}</span>
                    <span className="text-gray-600">Ongoing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">{getStatusIcon('Completed')}</span>
                    <span className="text-gray-600">Completed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">{getStatusIcon('Moved')}</span>
                    <span className="text-gray-600">Moved</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-green-300 pt-3 mt-3">
                <p className="text-xs font-semibold text-green-700 mb-1">Office Initials:</p>
                <p className="text-xs text-gray-600">Event cards show office initials (e.g., "CEO" for City Environment Office)</p>
              </div>
            </div>

            {/* Event Display */}
            {selectedDate && (
              <div className="p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-green-800">
                    {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getEventsForDate(selectedDate).length === 0 
                      ? 'bg-gray-100 text-gray-600' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {getEventsForDate(selectedDate).length} events
                  </span>
                </div>
                
                <div className="space-y-2">
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <div className="text-center py-4">
                      <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">No events scheduled</p>
                      <p className="text-gray-400 text-xs mt-1">Click on any day to see events</p>
                    </div>
                  ) : (
                    getEventsForDate(selectedDate).map(event => {
                      const colors = getEventColor(event, false);
                      return (
                        <div 
                          key={event.id} 
                          className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${colors.bg} ${colors.border}`}
                          onClick={() => handleEventClick(event, selectedDate)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className={`font-semibold text-sm ${colors.text}`}>{event.event_name}</h4>
                              <div className="text-xs opacity-75 mt-1 space-y-0.5">
                                {event.duration && <p>📅 {event.duration}</p>}
                                {event.pillar && <p>🌿 {event.pillar}</p>}
                                {event.office && <p>🏢 {event.office}</p>}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`flex-shrink-0 text-gray-600`}>
                                {getStatusIcon(event.status)}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                event.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                                event.status === 'Moved' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Event Details Modal */}
      {isEventModalOpen && selectedEventForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {selectedEventForModal && selectedEventForModal.isMultipleEvents ? (
              <React.Fragment>
                {/* Multiple events view */}
                <div>
                  <h4 className="text-lg font-semibold text-green-800 mb-2">
                    All Events for {new Date(selectedEventForModal.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <p className="text-sm text-gray-500">{selectedEventForModal.allEvents.length} events scheduled</p>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {selectedEventForModal.allEvents.map(event => {
                    const colors = getEventColor(event, false);
                    return (
                      <div key={event.id} className={`p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-1">{event.event_name}</h5>
                            <div className="text-xs opacity-75 mt-1 space-y-0.5">
                              {event.duration && <p>📅 {event.duration}</p>}
                              {event.pillar && <p>🌿 {event.pillar}</p>}
                              {event.office && <p>🏢 {event.office}</p>}
                            </div>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            event.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {/* Single event view */}
                {selectedEventForModal && !selectedEventForModal.isMultipleEvents && !showMoveInterface ? (
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2">{selectedEventForModal.event_name}</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">{new Date(selectedEventForModal.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                      
                      {selectedEventForModal.duration && (
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{selectedEventForModal.duration}</p>
                        </div>
                      )}
                      
                      {selectedEventForModal.pillar && (
                        <div>
                          <p className="text-sm text-gray-500">Pillar</p>
                          <p className="font-medium">{selectedEventForModal.pillar}</p>
                        </div>
                      )}
                      
                      {selectedEventForModal.office && (
                        <div>
                          <p className="text-sm text-gray-500">Office</p>
                          <p className="font-medium">{selectedEventForModal.office}</p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          selectedEventForModal.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          selectedEventForModal.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                          selectedEventForModal.status === 'Moved' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedEventForModal.status}
                        </span>
                      </div>
                      
                      {selectedEventForModal.created_at && (
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="font-medium text-xs">
                            {new Date(selectedEventForModal.created_at).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    {/* Move Event Interface */}
                    <div>
                      <h4 className="text-lg font-semibold text-green-800 mb-4">Move Event: {selectedEventForModal.event_name}</h4>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">
                          Current Date: {new Date(selectedEventForModal.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select New Date:
                        </label>
                        <input
                          type="date"
                          value={selectedMoveDate || ''}
                          onChange={(e) => setSelectedMoveDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> This will change the current event status to "Moved" and create a new event with the selected date.
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
            
            <div className="mt-6 flex justify-end space-x-2">
              {!showMoveInterface ? (
                <React.Fragment>
                  {selectedEventForModal.status !== 'Completed' && selectedEventForModal.status !== 'Moved' && (
                    <button
                      onClick={() => setShowMoveInterface(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Move Event
                    </button>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    onClick={() => setShowMoveInterface(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => selectedMoveDate && handleMoveEvent(selectedEventForModal, selectedMoveDate)}
                    disabled={!selectedMoveDate}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedMoveDate 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Confirm Move
                  </button>
                </React.Fragment>
              )}
              <button
                onClick={closeEventModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
