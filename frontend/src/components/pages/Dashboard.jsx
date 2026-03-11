import React, { useState, useEffect } from 'react';
import { FiCalendar, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import { calendarEventsAPI, projectsAPI } from '../../services/api';
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
  const [projects, setProjects] = useState([]); // Store projects from all pillars
  const [loading, setLoading] = useState(true);
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
      const eventsResponse = await calendarEventsAPI.getAll();
      setAllEvents(eventsResponse.data);

      // Reload projects to reflect any changes
      const projectsResponse = await projectsAPI.getAll();
      setProjects(projectsResponse.data);

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

  // Load events and projects from API on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('Dashboard: Loading events from API...');
        const eventsResponse = await calendarEventsAPI.getAll();
        console.log('Dashboard: Loaded events from API:', eventsResponse.data);
        setAllEvents(eventsResponse.data);

        console.log('Dashboard: Loading projects from API...');
        const projectsResponse = await projectsAPI.getAll();
        console.log('Dashboard: Loaded projects from API:', projectsResponse.data);
        setProjects(projectsResponse.data);
        
        // Debug: Log pillar stats calculation
        console.log('Dashboard: Projects loaded:', projectsResponse.data.length);
      } catch (error) {
        console.error('Dashboard: Error loading data from API:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  // Calculate pillar statistics from projects data
  const calculatePillarStats = () => {
    const pillars = [
      { name: '1. Food Security', color: '#2E7D32', displayName: 'Food Security' },
      { name: '2. Water Sufficiency', color: '#1E88E5', displayName: 'Water Sufficiency' },
      { name: '3. Ecological and Environmental stability', color: '#66BB6A', displayName: 'Ecological Stability' },
      { name: '4. Human Security', color: '#2E7D32', displayName: 'Human Security' },
      { name: '5. Climate-Smart Industries and Services', color: '#1E88E5', displayName: 'Climate-Smart Industries' },
      { name: '6. Sustainable Energy', color: '#66BB6A', displayName: 'Sustainable Energy' },
      { name: '7. Knowledge and Capacity Development', color: '#2E7D32', displayName: 'Knowledge & Capacity' }
    ];

    return pillars.map(pillar => {
      const pillarProjects = projects.filter(project => project.pillar === pillar.name);
      const totalProjects = pillarProjects.length;
      const completedProjects = pillarProjects.filter(project => project.status === 'Completed').length;
      const inProgressProjects = pillarProjects.filter(project => 
        project.status === 'In Progress' || project.status === 'Ongoing'
      ).length;
      
      // Calculate average accomplishment percentage
      const avgAccomplishment = totalProjects > 0 
        ? Math.round(pillarProjects.reduce((sum, project) => sum + (project.accomplishment || 0), 0) / totalProjects)
        : 0;

      return {
        ...pillar,
        totalProjects,
        completedProjects,
        inProgressProjects,
        progress: avgAccomplishment
      };
    });
  };

  const pillarStats = calculatePillarStats();
  
  // Debug: Log calculated pillar stats
  console.log('Dashboard: Calculated pillar stats:', pillarStats);

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Professional Header with Environment Theme */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200 shadow-sm">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">LCCAP Dashboard</h1>
                  <p className="text-gray-600 mt-1">Local Climate Change Action Plan Management System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Current Date</p>
                <p className="text-lg font-semibold text-gray-800">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="px-6 py-8">
        <div className="space-y-8">
          {/* Professional Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FiCalendar className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">Total Events</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{getEventStatistics().totalEvents}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>All recorded activities</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FiCheckCircle className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">Completed</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{getEventStatistics().completedEvents}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Successfully finished</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">In Progress</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{getEventStatistics().inProgressEvents || 0}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Currently active</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FiTrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500 font-medium">Completion Rate</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {getEventStatistics().totalEvents > 0 
                      ? Math.round((getEventStatistics().completedEvents / getEventStatistics().totalEvents) * 100) 
                      : 0}%
                  </p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Overall progress</span>
              </div>
            </div>
          </div>

          {/* Professional Calendar Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white backdrop-blur-sm"
                    title="Previous month"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white backdrop-blur-sm"
                    title="Next month"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">{formatMonthYear(currentDate)}</h3>
                </div>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 backdrop-blur-sm font-medium"
                >
                  Today
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <div key={index} className="text-sm font-semibold text-gray-700 py-2 border-b border-green-200">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const today = new Date();
                  const isToday = day && new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString() === today.toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`
                        relative p-3 h-24 border rounded-xl transition-all duration-200 cursor-pointer
                        ${!day ? 'bg-gray-50 border-gray-200 cursor-default' : 'bg-white border-gray-200 hover:border-green-400 hover:shadow-lg'}
                        ${isToday ? 'ring-2 ring-green-500 bg-green-50 border-green-400' : ''}
                      `}
                      onClick={() => day && handleDateClick(day)}
                    >
                      {day && (
                        <>
                          <div className={`
                            text-sm font-medium mb-2
                            ${isToday ? 'text-green-700 font-bold' : 'text-gray-700'}
                          `}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className={`
                                  text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity
                                  ${event.status === 'Completed' ? 'bg-green-500 text-white' : 
                                    event.status === 'Ongoing' ? 'bg-blue-500 text-white' : 
                                    event.status === 'Moved' ? 'bg-orange-500 text-white' : 
                                    'bg-gray-400 text-white'}
                                `}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event, day);
                                }}
                                title={event.event_name}
                              >
                                <div className="flex items-center gap-1">
                                  <span className="truncate">{event.event_name}</span>
                                  {event.duration && (
                                    <span className="text-xs opacity-75">({event.duration}d)</span>
                                  )}
                                </div>
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500 italic">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Professional Accomplishments Table */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <FiTrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">LCCAP Pillar Accomplishments</h3>
                </div>
                <div className="text-white/80 text-sm">
                  Environmental Progress Tracking
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading pillar data...</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-4 px-4 font-semibold text-gray-700">Pillar</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">Total Projects</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">Completed</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">In Progress</th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-700">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pillarStats.map((pillar, index) => {
                        return (
                          <tr key={index} className="border-b border-gray-100 hover:bg-green-50/50 transition-colors">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <div 
                                  className="w-4 h-4 rounded-full mr-3 shadow-sm"
                                  style={{ backgroundColor: pillar.color }}
                                ></div>
                                <span className="font-medium text-gray-800">{pillar.displayName}</span>
                              </div>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg font-semibold text-gray-700">
                                {pillar.totalProjects}
                              </span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="inline-flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg font-semibold text-green-700">
                                {pillar.completedProjects}
                              </span>
                            </td>
                            <td className="text-center py-4 px-4">
                              <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg font-semibold text-blue-700">
                                {pillar.inProgressProjects}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center justify-center">
                                <div className="w-full max-w-32 bg-gray-200 rounded-full h-3 mr-3">
                                  <div 
                                    className="h-3 rounded-full transition-all duration-500 shadow-sm"
                                    style={{ 
                                      width: `${pillar.progress}%`,
                                      backgroundColor: pillar.progress >= 70 ? '#10b981' : pillar.progress >= 50 ? '#84cc16' : '#f59e0b'
                                    }}
                                  ></div>
                                </div>
                                <span className={`text-sm font-bold min-w-[3rem] text-center ${
                                  pillar.progress >= 70 ? 'text-green-600' : 
                                  pillar.progress >= 50 ? 'text-lime-600' : 
                                  'text-amber-600'
                                }`}>
                                  {pillar.progress}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Professional Event Details Modal */}
      {isEventModalOpen && selectedEventForModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 m-4 max-w-md w-full max-h-[90vh] overflow-y-auto border border-green-100">
            {selectedEventForModal && selectedEventForModal.isMultipleEvents ? (
              <React.Fragment>
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    All Events for {new Date(selectedEventForModal.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <p className="text-gray-600">{selectedEventForModal.allEvents.length} events scheduled</p>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto mb-6">
                  {selectedEventForModal.allEvents.map(event => {
                    const colors = getEventColor(event, false);
                    return (
                      <div key={event.id} className={`p-4 rounded-xl border ${colors.bg} ${colors.border}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 mb-2">{event.event_name}</h5>
                            <div className="text-sm text-gray-600 space-y-1">
                              {event.duration && <p>📅 Duration: {event.duration}</p>}
                              {event.pillar && <p>🌿 Pillar: {event.pillar}</p>}
                              {event.office && <p>🏢 Office: {event.office}</p>}
                            </div>
                          </div>
                          <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
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
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">{selectedEventForModal.event_name}</h4>
                  
                  {showMoveInterface ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                      <h5 className="text-lg font-semibold text-amber-800 mb-3">Move Event</h5>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Date: {new Date(selectedEventForModal.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </label>
                        <input
                          type="date"
                          value={selectedMoveDate || ''}
                          onChange={(e) => setSelectedMoveDate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <p className="text-sm text-amber-700">
                        <strong>Note:</strong> This will change the current event status to "Moved" and create a new event with the selected date.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-semibold text-gray-800">{new Date(selectedEventForModal.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</p>
                      </div>
                      {selectedEventForModal.duration && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Duration</p>
                          <p className="font-semibold text-gray-800">{selectedEventForModal.duration}</p>
                        </div>
                      )}
                      {selectedEventForModal.pillar && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Pillar</p>
                          <p className="font-semibold text-gray-800">{selectedEventForModal.pillar}</p>
                        </div>
                      )}
                      {selectedEventForModal.office && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Office</p>
                          <p className="font-semibold text-gray-800">{selectedEventForModal.office}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          selectedEventForModal.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          selectedEventForModal.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                          selectedEventForModal.status === 'Moved' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedEventForModal.status}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </React.Fragment>
            )}
            
            <div className="flex justify-end space-x-3">
              {!showMoveInterface ? (
                <React.Fragment>
                  {selectedEventForModal.status !== 'Completed' && selectedEventForModal.status !== 'Moved' && (
                    <button
                      onClick={() => setShowMoveInterface(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Move Event
                    </button>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <button
                    onClick={() => setShowMoveInterface(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => selectedMoveDate && handleMoveEvent(selectedEventForModal, selectedMoveDate)}
                    disabled={!selectedMoveDate}
                    className={`px-4 py-2 rounded-lg transition-colors font-medium ${
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
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
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
