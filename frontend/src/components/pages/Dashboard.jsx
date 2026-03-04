import React, { useState, useEffect } from 'react';
import { calendarEventsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

import Header from '../layout/Header';

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

  // Save notificationsShown to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notificationsShown', JSON.stringify(Array.from(notificationsShown)));
  }, [notificationsShown]);

  // Handle event click to show details
  const handleEventClick = (event, day) => {
    setSelectedEventForModal(event);
    setIsEventModalOpen(true);
  };

  // Close event modal
  const closeEventModal = () => {
    setIsEventModalOpen(false);
    setSelectedEventForModal(null);
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



  // Check for upcoming events and show notifications
  const checkEventNotifications = (events) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Clean up old notifications (older than yesterday)
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    setNotificationsShown(prev => {
      const filtered = new Set([...prev].filter(id => {
        const [dateType, eventId] = id.split('-');
        const eventDate = events.find(e => e.id.toString() === eventId)?.date;
        return eventDate && eventDate >= yesterdayStr;
      }));
      return filtered;
    });
    
    events.forEach(event => {
      // Check if event is today
      if (event.date === todayStr) {
        const notificationId = `today-${event.id}`;
        if (!notificationsShown.has(notificationId)) {
          showWarning(
            `🌿 Today's Event: "${event.event_name}" is scheduled for today!`,
            8000
          );
          setNotificationsShown(prev => new Set([...prev, notificationId]));
        }
      }
      
      // Check if event is tomorrow
      if (event.date === tomorrowStr) {
        const notificationId = `tomorrow-${event.id}`;
        if (!notificationsShown.has(notificationId)) {
          showInfo(
            `🍃 Upcoming Event: "${event.event_name}" is scheduled for tomorrow!`,
            8000
          );
          setNotificationsShown(prev => new Set([...prev, notificationId]));
        }
      }
    });
  };

  // Reset notifications (for testing purposes)
  const resetNotifications = () => {
    setNotificationsShown(new Set());
    localStorage.removeItem('notificationsShown');
  };

  // Clear notifications for past events (called on login)
  const clearPastNotifications = (events) => {
    const today = new Date().toISOString().split('T')[0];
    setNotificationsShown(prev => {
      const filtered = new Set([...prev].filter(id => {
        const [dateType, eventId] = id.split('-');
        const eventDate = events.find(e => e.id.toString() === eventId)?.date;
        return eventDate && eventDate >= today;
      }));
      return filtered;
    });
  };



  // Load events from API on component mount
  useEffect(() => {

    const loadEvents = async () => {
      try {
        console.log('Dashboard: Loading events from API...');
        const response = await calendarEventsAPI.getAll();
        console.log('Dashboard: Loaded events from API:', response.data);

        // Store full events array for color coding
        setAllEvents(response.data);

        // Clear past notifications and check for new ones
        clearPastNotifications(response.data);
        checkEventNotifications(response.data);

        // Convert calendar events array to dashboard format with multi-day support
        const dashboardEvents = {};
        response.data.forEach(event => {
          // Add event for the start date
          dashboardEvents[event.date] = event.event_name;
          
          // If event has duration, add it to subsequent days
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
            
            // Add event to each day in the duration
            const eventDate = new Date(event.date);
            for (let i = 1; i < days; i++) {
              const nextDate = new Date(eventDate);
              nextDate.setDate(eventDate.getDate() + i);
              const dateStr = nextDate.toISOString().split('T')[0];
              dashboardEvents[dateStr] = event.event_name;
            }
          }
        });
        setEvents(dashboardEvents);

      } catch (error) {
        console.error('Dashboard: Error loading events from API:', error);
        // Set default events on error
        setEvents({
          '2024-02-15': 'Climate Action Planning',
          '2024-02-20': 'Stakeholder Meeting',
          '2024-02-25': 'Progress Review',
          '2024-03-01': 'Target Assessment',
          '2024-03-10': 'Annual Report Due'
        });
      }
    };

    loadEvents();

    // Poll for changes every 2 seconds
    const intervalId = setInterval(async () => {
      try {
        console.log('Dashboard: Polling API for events...');
        const response = await calendarEventsAPI.getAll();
        console.log('Dashboard: Polling loaded events from API:', response.data);
        
        // Store full events array for color coding
        setAllEvents(response.data);
        
        // Check for event notifications (only for new events)
        clearPastNotifications(response.data);
        checkEventNotifications(response.data);
        
        // Convert calendar events array to dashboard format with multi-day support
        const dashboardEvents = {};
        response.data.forEach(event => {
          // Add event for the start date
          dashboardEvents[event.date] = event.event_name;
          
          // If event has duration, add it to subsequent days
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
            
            // Add event to each day in the duration
            const eventDate = new Date(event.date);
            for (let i = 1; i < days; i++) {
              const nextDate = new Date(eventDate);
              nextDate.setDate(eventDate.getDate() + i);
              const dateStr = nextDate.toISOString().split('T')[0];
              dashboardEvents[dateStr] = event.event_name;
            }
          }
        });
        setEvents(dashboardEvents);
      } catch (error) {
        console.error('Dashboard: Error polling events from API:', error);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };

  }, []);

  // Calendar navigation helpers
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date().getDate());
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

  // Calculate event statistics
  const getEventStatistics = () => {
    const totalEvents = allEvents.length;
    const completedEvents = allEvents.filter(event => event.status === 'Completed').length;
    const ongoingEvents = allEvents.filter(event => event.status === 'Ongoing').length;
    const plannedEvents = allEvents.filter(event => event.status === 'Planned').length;
    const thisMonthEvents = allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === currentDate.getMonth() && 
             eventDate.getFullYear() === currentDate.getFullYear();
    }).length;
    
    return {
      totalEvents,
      completedEvents,
      ongoingEvents,
      plannedEvents,
      thisMonthEvents,
      completionRate: totalEvents > 0 ? Math.round((completedEvents / totalEvents) * 100) : 0
    };
  };

  // Enhanced event detection
  const getEventCount = (day) => {
    if (!day) return 0;
    return getEventsForDate(day).length;
  };

  const hasMultipleEvents = (day) => {
    return getEventCount(day) > 1;
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
      const dayEvents = getEventsForDate(day);
      if (dayEvents.length > 0) {
        // Open modal with all events for this day
        setSelectedEventForModal({
          isMultipleEvents: true,
          date: new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0],
          allEvents: dayEvents
        });
        setIsEventModalOpen(true);
      }
    }
  };



  return (
    <div className="p-6 h-full overflow-hidden">
      {/* Dashboard Content - Left Side Calendar Layout */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Calendar */}
        <div className="lg:col-span-2 bg-green-50 rounded-lg shadow-lg p-8 flex flex-col h-full border-2 border-green-400">
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
                                className={`text-xs truncate px-1 py-0.5 rounded cursor-pointer hover:opacity-80 transition-opacity ${
                                  isToday ? 'bg-white/20 text-white' : colors.bg
                                } ${isToday ? 'text-white' : colors.text}`}
                                title={event.event_name}
                              >
                                {event.event_name}
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

          {/* Enhanced Event Display */}
          {selectedDate && (
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm">
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
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
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
                  })
                )}
              </div>
            </div>
          )}

          {/* Calendar Legend */}
          <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Calendar Legend</h4>
            <div className="flex flex-wrap gap-3 text-xs">
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
          </div>
        </div>

        {/* Right Side - Statistics Cards */}
        <div className="lg:col-span-1 space-y-4">
          {/* Statistics Header */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Event Overview</h3>
            <p className="text-sm text-gray-500">Climate Action Progress</p>
          </div>

          {/* Total Events Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-4 border border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Total Events</p>
                <p className="text-2xl font-bold text-green-900">{getEventStatistics().totalEvents}</p>
              </div>
              <div className="bg-green-600 text-white p-3 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Events Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-md p-4 border border-emerald-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-700 font-medium">Completed</p>
                <p className="text-2xl font-bold text-emerald-900">{getEventStatistics().completedEvents}</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-emerald-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getEventStatistics().completionRate}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-emerald-700 font-medium">
                    {getEventStatistics().completionRate}%
                  </span>
                </div>
              </div>
              <div className="bg-emerald-600 text-white p-3 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Ongoing Events Card */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md p-4 border border-amber-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-700 font-medium">Ongoing</p>
                <p className="text-2xl font-bold text-amber-900">{getEventStatistics().ongoingEvents}</p>
              </div>
              <div className="bg-amber-600 text-white p-3 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* This Month Events Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-4 border border-blue-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">This Month</p>
                <p className="text-2xl font-bold text-blue-900">{getEventStatistics().thisMonthEvents}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {formatMonthYear(currentDate)}
                </p>
              </div>
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Planned Events Card */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-md p-4 border border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 font-medium">Planned</p>
                <p className="text-2xl font-bold text-gray-900">{getEventStatistics().plannedEvents}</p>
              </div>
              <div className="bg-gray-600 text-white p-3 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-4 border border-green-200">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button
                onClick={() => navigateToPage && navigateToPage('calendar')}
                className="w-full px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                📅 Add New Event
              </button>
              <button
                onClick={goToToday}
                className="w-full px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                📍 Go to Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {isEventModalOpen && selectedEventForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedEventForModal.isMultipleEvents ? 'All Events' : 'Event Details'}
              </h3>
            </div>
            
            <div className="space-y-4">
              {selectedEventForModal.isMultipleEvents ? (
                // Multiple events view
                <>
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
                              <div className="space-y-1 text-sm">
                                {event.duration && (
                                  <p><span className="text-gray-500">Duration:</span> {event.duration}</p>
                                )}
                                {event.pillar && (
                                  <p><span className="text-gray-500">Pillar:</span> {event.pillar}</p>
                                )}
                                {event.office && (
                                  <p><span className="text-gray-500">Office:</span> {event.office}</p>
                                )}
                              </div>
                              <div className="mt-2">
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                  event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                  event.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {event.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                // Single event view (existing code)
                <>
                  <div>
                    <h4 className="text-lg font-semibold text-green-800 mb-2">{selectedEventForModal.event_name}</h4>
                  </div>
                  
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
                  </div>
                  
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
                </>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeEventModal}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

};



export default Dashboard;

