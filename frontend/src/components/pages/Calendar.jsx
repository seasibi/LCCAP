import React, { useState, useEffect } from 'react';
import { calendarEventsAPI } from '../../services/api';

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Calendar = ({ onLogout, navigateToPage }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    event_name: '',
    pillar: '',
    program: '',
    office: '',
    date: '',
    duration: '',
    status: 'Planned'
  });
  
  // Filtering state
  const [filters, setFilters] = useState({
    pillar: '',
    office: '',
    status: '',
    searchTerm: ''
  });
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Load events from API on mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        console.log('Calendar: Loading events from API...');
        const response = await calendarEventsAPI.getAll();
        console.log('Calendar: Loaded events from API:', response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Calendar: Error loading events from API:', error);
      }
    };
    
    loadEvents();
  }, []);

  // Apply filters whenever events or filters change
  useEffect(() => {
    let filtered = [...events];
    
    // Filter by pillar
    if (filters.pillar) {
      filtered = filtered.filter(event => event.pillar === filters.pillar);
    }
    
    // Filter by office
    if (filters.office) {
      filtered = filtered.filter(event => event.office === filters.office);
    }
    
    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(event => event.status === filters.status);
    }
    
    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(event => 
        event.event_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        event.office.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    setFilteredEvents(filtered);
  }, [events, filters]);

  const pillars = ['1. Food Security', '2. Water Sufficiency', '3. Ecological and Environmental stability', '4. Human Security', '5. Climate-Smart Industries and Services', '6. Sustainable Energy', '7. Knowledge and Capacity Development'];
  
  const programs = {
    '1. Food Security': ['Urban Garden Program', 'Feeding Program', 'Nutrition Education'],
    '2. Water Sufficiency': ['Water Supply Expansion', 'Water Treatment Plant Upgrade', 'Watershed Protection'],
    '3. Ecological and Environmental stability': ['Tree Planting Program', 'Park Development', 'Biodiversity Conservation'],
    '4. Human Security': ['Health Services Enhancement', 'Livelihood Programs', 'Community Safety'],
    '5. Climate-Smart Industries and Services': ['Green Business Certification', 'Industrial Zone Development', 'Sustainable Tourism'],
    '6. Sustainable Energy': ['Solar Street Lighting', 'Renewable Energy Program', 'Energy Efficiency'],
    '7. Knowledge and Capacity Development': ['Climate Change Training', 'Capacity Building Program', 'Public Awareness']
  };

  const officePrograms = {
    'City Mayor\'s Office (CMO)': ['Climate Change Training', 'Capacity Building Program', 'Public Awareness', 'Green Business Certification'],
    'City Human Resource Management Office (CHRMO)': ['Capacity Building Program', 'Climate Change Training'],
    'City General Services Office (CGSO)': ['Energy Efficiency', 'Sustainable Tourism'],
    'City Building and Architecture Office (CBAO)': ['Green Business Certification', 'Industrial Zone Development'],
    'City Planning, Development and Sustainability Office (CPDSO)': ['Tree Planting Program', 'Park Development', 'Biodiversity Conservation', 'Watershed Protection'],
    'City Disaster Risk Reduction and Management Office (CDRRMO)': ['Community Safety', 'Climate Change Training'],
    'City Veterinary and Agriculture Office (CVAO)': ['Urban Garden Program', 'Feeding Program', 'Nutrition Education'],
    'City Social Welfare and Development Office (CSWDO)': ['Livelihood Programs', 'Community Safety', 'Feeding Program'],
    'City Health Services Office (CHSO)': ['Health Services Enhancement', 'Nutrition Education'],
    'City Environment and Parks Management Office (CEPMO)': ['Tree Planting Program', 'Park Development', 'Biodiversity Conservation', 'Watershed Protection'],
    'City Engineering Office': ['Water Supply Expansion', 'Water Treatment Plant Upgrade', 'Solar Street Lighting'],
    'Bureau of Fire Protection (BFP)': ['Community Safety', 'Health Services Enhancement'],
    'Benguet Electric Cooperative (BENECO)': ['Solar Street Lighting', 'Renewable Energy Program', 'Energy Efficiency'],
    'Department of Public Works and Highways (DPWH)': ['Water Supply Expansion', 'Water Treatment Plant Upgrade'],
    'Human Resource Management Office (HRMO)': ['Capacity Building Program', 'Climate Change Training']
  };
  const offices = [
    'City Mayor\'s Office (CMO)',
    'City Human Resource Management Office (CHRMO)',
    'City General Services Office (CGSO)',
    'City Building and Architecture Office (CBAO)',
    'City Planning, Development and Sustainability Office (CPDSO)',
    'City Disaster Risk Reduction and Management Office (CDRRMO)',
    'City Veterinary and Agriculture Office (CVAO)',
    'City Social Welfare and Development Office (CSWDO)',
    'City Health Services Office (CHSO)',
    'City Environment and Parks Management Office (CEPMO)',
    'City Engineering Office',
    'Bureau of Fire Protection (BFP)',
    'Benguet Electric Cooperative (BENECO)',
    'Department of Public Works and Highways (DPWH)',
    'Human Resource Management Office (HRMO)'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const openEventForm = (date, event = null) => {
    setSelectedDate(date);
    if (event) {
      setEditingEvent(event);
      setFormData({
        event_name: event.event_name,
        pillar: event.pillar,
        program: event.program || '',
        office: event.office,
        date: event.date,
        duration: event.duration,
        status: event.status
      });
    } else {
      setEditingEvent(null);
      setFormData({
        event_name: '',
        pillar: '',
        program: '',
        office: '',
        date: date.toISOString().split('T')[0],
        duration: '',
        status: 'Planned'
      });
    }
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      event_name: event.event_name,
      pillar: event.pillar,
      program: event.program || '',
      office: event.office,
      date: event.date,
      duration: event.duration,
      status: event.status
    });
    setShowEventForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        console.log('Calendar: Deleting event from API:', eventId);
        await calendarEventsAPI.delete(eventId);
        console.log('Calendar: Event deleted successfully');
        // Refresh events list
        const response = await calendarEventsAPI.getAll();
        setEvents(response.data);
      } catch (error) {
        console.error('Calendar: Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      }
    }
  };

  const handleSaveEvent = async () => {
    if (!formData.event_name || !formData.date) {
      alert('Please fill in event name and date');
      return;
    }

    try {
      if (editingEvent) {
        // Update existing event
        console.log('Calendar: Updating event in API:', editingEvent.id, formData);
        await calendarEventsAPI.update(editingEvent.id, formData);
        console.log('Calendar: Event updated successfully');
      } else {
        // Add new event
        console.log('Calendar: Creating new event in API:', formData);
        await calendarEventsAPI.create(formData);
        console.log('Calendar: Event created successfully');
      }

      // Refresh events list
      const response = await calendarEventsAPI.getAll();
      setEvents(response.data);

      // Reset form
      setShowEventForm(false);
      setEditingEvent(null);
      setFormData({
        event_name: '',
        pillar: '',
        office: '',
        date: '',
        duration: '',
        status: 'Planned'
      });
    } catch (error) {
      console.error('Calendar: Error saving event:', error);
      alert('Error saving event. Please try again.');
    }
  };

  const handleCancelEvent = () => {
    setShowEventForm(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  // Get events for a specific date
  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => {
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

  // Check if an event is the start of a multi-day event
  const isEventStart = (event, day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return event.date === dateStr;
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

  // Get the duration span for an event
  const getEventSpan = (event, day) => {
    if (!event.duration) return 1;
    
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
    const currentDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const targetDate = new Date(currentDateStr);
    
    // Calculate remaining days from current position
    let remainingDays = 0;
    for (let i = 0; i < days; i++) {
      const checkDate = new Date(eventDate);
      checkDate.setDate(eventDate.getDate() + i);
      if (checkDate.toDateString() === targetDate.toDateString()) {
        remainingDays = days - i;
        break;
      }
    }
    
    return remainingDays;
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square bg-gray-50 border border-gray-200 rounded-xl relative cursor-default"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday or Saturday
      const dayEvents = getEventsForDate(day);
      
      // Check for multi-day events that start on this day
      const multiDayEvents = dayEvents.filter(event => isEventStart(event, day));
      const regularEvents = dayEvents.filter(event => !isEventStart(event, day));
      
      days.push(
        <div 
          key={day} 
          className={`
            relative p-2 cursor-pointer rounded-xl transition-all duration-200 min-h-[85px] border aspect-square flex flex-col text-sm font-medium
            ${isToday ? 'bg-green-500 text-white border-green-600 shadow-lg' : ''}
            ${!isToday && isWeekend ? 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300' : ''}
            ${!isToday && !isWeekend ? 'bg-white border-gray-300 hover:bg-green-50 hover:border-green-400 hover:shadow-md' : ''}
          `}
        >
          <div className="flex justify-between items-start p-1">
            <span className={`text-sm font-medium mb-1 ${isToday ? 'text-white' : isWeekend ? 'text-red-700' : 'text-gray-700'}`}>{day}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openEventForm(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
              }}
              className="p-1 opacity-30 hover:opacity-100 transition-opacity duration-200 rounded hover:bg-green-100"
            >
              <PlusIcon />
            </button>
          </div>
          
          {/* Event indicators */}
          <div className="flex-1 overflow-hidden px-1 pb-1">
            {/* Multi-day events (shown as spanning bars) */}
            {multiDayEvents.slice(0, 2).map((event, index) => {
              const span = getEventSpan(event, day);
              const colors = getEventColor(event, isToday);
              return (
                <div 
                  key={event.id}
                  className={`text-xs truncate mb-1 px-1 py-0.5 rounded font-medium ${colors.bg} ${colors.text} ${colors.border}`}
                  title={`${event.event_name} (${event.duration})`}
                  style={{
                    gridColumn: `span ${Math.min(span, 7)}`,
                    borderLeft: `3px solid ${isToday ? '#16a34a' : colors.borderHex}`
                  }}
                >
                  {isEventStart(event, day) ? `${event.event_name} (${event.duration})` : '→'}
                </div>
              );
            })}
            
            {/* Regular single-day events */}
            {regularEvents.slice(0, multiDayEvents.length > 0 ? 1 : 3).map((event, index) => {
              const colors = getEventColor(event, isToday);
              return (
                <div 
                  key={event.id}
                  className={`text-xs truncate mb-1 px-1 py-0.5 rounded ${colors.bg} ${colors.text}`}
                  title={event.event_name}
                >
                  {event.event_name}
                </div>
              );
            })}
            
            {/* More events indicator */}
            {(dayEvents.length > (multiDayEvents.length > 0 ? 3 : 3)) && (
              <div className={`text-xs truncate px-1 py-0.5 rounded ${
                isToday ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                +{dayEvents.length - (multiDayEvents.length > 0 ? 3 : 3)} more
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Climate Calendar</h1>
                  <p className="text-gray-600 mt-1">Local Climate Change Action Plan Event Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Events</p>
                <p className="text-lg font-semibold text-gray-800">{filteredEvents.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Filters / Event Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              {!showEventForm ? (
                <>
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Event Filters</h2>
                        <p className="text-white/80 text-sm">Filter calendar events</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Filter by Pillar
                      </label>
                      <select 
                        value={filters.pillar}
                        onChange={(e) => setFilters({...filters, pillar: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="">All Pillars</option>
                        {pillars.map(pillar => (
                          <option key={pillar} value={pillar}>{pillar}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Filter by Office
                      </label>
                      <select 
                        value={filters.office}
                        onChange={(e) => setFilters({...filters, office: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="">All Offices</option>
                        {offices.map(office => (
                          <option key={office} value={office}>{office}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Filter by Status
                      </label>
                      <select 
                        value={filters.status}
                        onChange={(e) => setFilters({...filters, status: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="">All Status</option>
                        <option value="Planned">Planned</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                        <option value="Moved">Moved</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Search Events
                      </label>
                      <input
                        type="text"
                        value={filters.searchTerm}
                        onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                        placeholder="Search by event name or office..."
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <button 
                        onClick={() => setFilters({ pillar: '', office: '', status: '', searchTerm: '' })}
                        className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all duration-200"
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                  
                  {/* Events List */}
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Events List {filteredEvents.length !== events.length && `(${filteredEvents.length}/${events.length})`}
                      </h3>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {filteredEvents.length === 0 ? (
                          <div className="text-center py-8">
                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-500 text-sm">
                              {events.length === 0 ? 'No events scheduled' : 'No events match current filters'}
                            </p>
                          </div>
                        ) : (
                          filteredEvents
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map(event => (
                              <div key={event.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">{event.event_name}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{new Date(event.date).toLocaleDateString()}</p>
                                    <p className="text-xs text-gray-600">{event.pillar} • {event.office}</p>
                                  </div>
                                  <div className="flex gap-2 ml-2">
                                    <button
                                      onClick={() => handleEditEvent(event)}
                                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200"
                                      title="Edit event"
                                    >
                                      <EditIcon />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteEvent(event.id)}
                                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                                      title="Delete event"
                                    >
                                      <DeleteIcon />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                    event.status === 'Ongoing' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {event.status}
                                  </span>
                                  {event.duration && (
                                    <span className="text-xs text-gray-500">{event.duration}</span>
                                  )}
                                </div>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {editingEvent ? 'Edit Event' : 'Create Event'}
                        </h2>
                        <p className="text-white/80 text-sm">
                          {selectedDate && `${editingEvent ? 'Edit' : 'Event for'} ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Event Name
                      </label>
                      <input
                        type="text"
                        value={formData.event_name}
                        onChange={(e) => setFormData({...formData, event_name: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        placeholder="Enter event name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Pillar
                      </label>
                      <select
                        value={formData.pillar}
                        onChange={(e) => setFormData({...formData, pillar: e.target.value, program: ''})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="">Select Pillar</option>
                        {pillars.map(pillar => (
                          <option key={pillar} value={pillar}>{pillar}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Office
                      </label>
                      <select
                        value={formData.office}
                        onChange={(e) => setFormData({...formData, office: e.target.value, program: ''})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="">Select Office</option>
                        {offices.map(office => (
                          <option key={office} value={office}>{office}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Program
                      </label>
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({...formData, program: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                        disabled={!formData.pillar || !formData.office}
                      >
                        <option value="">Select Program</option>
                        {formData.pillar && formData.office && (() => {
                          const pillarPrograms = programs[formData.pillar] || [];
                          const officeProgramList = officePrograms[formData.office] || [];
                          const filteredPrograms = pillarPrograms.filter(program => 
                            officeProgramList.includes(program)
                          );
                          return filteredPrograms.map(program => (
                            <option key={program} value={program}>{program}</option>
                          ));
                        })()}
                      </select>
                      {formData.pillar && formData.office && (() => {
                        const pillarPrograms = programs[formData.pillar] || [];
                        const officeProgramList = officePrograms[formData.office] || [];
                        const filteredPrograms = pillarPrograms.filter(program => 
                          officeProgramList.includes(program)
                        );
                        if (filteredPrograms.length === 0) {
                          return (
                            <p className="text-xs text-amber-600 mt-2">
                              No programs available for this office under the selected pillar
                            </p>
                          );
                        }
                        return null;
                      })()}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      >
                        <option value="">Single Day</option>
                        <option value="2 days">2 Days</option>
                        <option value="3 days">3 Days</option>
                        <option value="4 days">4 Days</option>
                        <option value="5 days">5 Days</option>
                        <option value="1 week">1 Week</option>
                        <option value="2 weeks">2 Weeks</option>
                        <option value="1 month">1 Month</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2">
                        Multi-day events will appear across consecutive days
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Accomplishment Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                      >
                       <option hidden selected value="Select Status">Select Status</option>
                        <option value="Planned">Planned</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-6">
                    <button
                      onClick={handleSaveEvent}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Save Event
                    </button>
                    <button
                      onClick={handleCancelEvent}
                      className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Panel - Calendar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button 
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white backdrop-blur-sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
                    </div>
                    <button 
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 text-white backdrop-blur-sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-sm font-semibold text-gray-700 py-2 border-b border-green-200">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {generateCalendarDays()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
