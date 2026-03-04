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
    office: '',
    date: '',
    duration: '',
    status: 'Planned'
  });

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

  const pillars = ['1. Food Security', '2. Water Sufficiency', '3. Ecological and Environmental stability', '4. Human Security', '5. Climate-Smart Industries and Services', '6. Sustainable Energy', '7. Knowledge and Capacity Development'];
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

  const handleAddEvent = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    setEditingEvent(null);
    setFormData({
      event_name: '',
      pillar: '',
      office: '',
      date: date.toISOString().split('T')[0],
      duration: '',
      status: 'Planned'
    });
    setShowEventForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData({
      event_name: event.event_name,
      pillar: event.pillar,
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
        <div key={`empty-${i}`} className="aspect-square border border-gray-200 bg-gray-50 rounded-lg relative"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      const dayEvents = getEventsForDate(day);
      
      // Check for multi-day events that start on this day
      const multiDayEvents = dayEvents.filter(event => isEventStart(event, day));
      const regularEvents = dayEvents.filter(event => !isEventStart(event, day));
      
      days.push(
        <div 
          key={day} 
          className={`aspect-square flex flex-col border-2 border-green-300 rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium relative
            ${isToday ? 'bg-green-100 text-green-800 border-green-600 hover:bg-green-200' : 'bg-green-50 text-gray-700 border-green-400 hover:bg-green-100 hover:border-green-500'}`}
        >
          <div className="flex justify-between items-start p-1">
            <span className="text-xs">{day}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddEvent(day);
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
    <div className="h-full p-6">
      <div className="h-full grid grid-cols-10 gap-6">
        {/* Left Panel - Filters / Event Form (30%) */}
        <div className="col-span-3 bg-green-50 rounded-lg shadow-md p-6 overflow-hidden flex flex-col">
          {!showEventForm ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-green-700 mb-2">Filters</h2>
                <p className="text-gray-600 text-sm">Filter calendar events by category</p>
              </div>
              
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Pillar
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    {pillars.map(pillar => (
                      <option key={pillar} value={pillar}>{pillar}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Office
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="">All Offices</option>
                    {offices.map(office => (
                      <option key={office} value={office}>{office}</option>
                    ))}
                  </select>
                </div>
                
                <div className="pt-4">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium">
                    Apply Filters
                  </button>
                </div>
                
                {/* Events List */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Events List</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {events.length === 0 ? (
                      <p className="text-gray-500 text-sm text-center py-4">No events scheduled</p>
                    ) : (
                      events
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map(event => (
                          <div key={event.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 truncate">{event.event_name}</h4>
                                <p className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                                <p className="text-xs text-gray-600">{event.pillar} • {event.office}</p>
                              </div>
                              <div className="flex gap-1 ml-2">
                                <button
                                  onClick={() => handleEditEvent(event)}
                                  className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                  title="Edit event"
                                >
                                  <EditIcon />
                                </button>
                                <button
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                                  title="Delete event"
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded ${
                                event.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                event.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
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
              <div className="mb-6">
                <h2 className="text-xl font-bold text-green-700 mb-2">
                  {editingEvent ? 'Edit Event' : 'Create Event'}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selectedDate && `${editingEvent ? 'Edit' : 'Event for'} ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                </p>
              </div>
              
              <div className="space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={formData.event_name}
                    onChange={(e) => setFormData({...formData, event_name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter event name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pillar
                  </label>
                  <select
                    value={formData.pillar}
                    onChange={(e) => setFormData({...formData, pillar: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Pillar</option>
                    {pillars.map(pillar => (
                      <option key={pillar} value={pillar}>{pillar}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Office
                  </label>
                  <select
                    value={formData.office}
                    onChange={(e) => setFormData({...formData, office: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select Office</option>
                    {offices.map(office => (
                      <option key={office} value={office}>{office}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                  <p className="text-xs text-gray-500 mt-1">
                    Multi-day events will appear across consecutive days
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accomplishment Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                   <option hidden selected value="Select Status">Select Status</option>
                    <option value="Planned">Planned</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveEvent}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  Save Event
                </button>
                <button
                  onClick={handleCancelEvent}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Calendar (70%) */}
        <div className="col-span-7 bg-green-50 rounded-lg shadow-md p-6 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <button 
              className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors" 
              onClick={() => navigateMonth('prev')}
            >
              ‹
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button 
              className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors" 
              onClick={() => navigateMonth('next')}
            >
              ›
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-7 gap-1 mb-1">
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-xs text-gray-600 p-2 bg-green-50 rounded">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
