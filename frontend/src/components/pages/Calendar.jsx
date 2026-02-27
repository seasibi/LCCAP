import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import '../../Calendar.css';

const Calendar = ({ onLogout, navigateToPage }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    if (navigateToPage) {
      navigateToPage(page);
    }
  };

  // Form state
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'meeting',
    location: '',
    priority: 'medium',
    reminder: false,
    reminderTime: '15'
  });

  const categories = [
    { value: 'meeting', label: 'Meeting', color: '#4a7c59' },
    { value: 'deadline', label: 'Deadline', color: '#dc3545' },
    { value: 'workshop', label: 'Workshop', color: '#ffc107' },
    { value: 'inspection', label: 'Inspection', color: '#17a2b8' },
    { value: 'report', label: 'Report', color: '#6f42c1' },
    { value: 'other', label: 'Other', color: '#6c757d' }
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: '#28a745' },
    { value: 'medium', label: 'Medium', color: '#ffc107' },
    { value: 'high', label: 'High', color: '#dc3545' }
  ];

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  // Calendar functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square flex items-center justify-center border border-gray-200 bg-gray-50">
          <span className="text-gray-400 text-xs"></span>
        </div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = isCurrentMonth && day === today.getDate();
      const hasEvents = events.filter(event => 
        event.date.toDateString() === date.toDateString()
      );
      
      days.push(
        <div 
          key={day} 
          className={`aspect-square flex items-center justify-center border rounded-lg cursor-pointer transition-all duration-200 text-sm relative
            ${isToday ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300'}`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
          {hasEvents.length > 0 && (
            <div className="absolute bottom-1 flex gap-1">
              {hasEvents.slice(0, 3).map((_, index) => (
                <div key={index} className="w-1 h-1 bg-green-400 rounded-full"></div>
              ))}
            </div>
          )}
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

  const navigateYear = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <Header showSidebarToggle={true} onSidebarToggle={toggleSidebar} />
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">🌿</div>
              <span className="logo-text">LCCAP</span>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-item" onClick={() => handleNavigation('dashboard')}>
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('accomplishment')}>
              <span className="nav-icon">🏆</span>
              <span className="nav-text">Accomplishment</span>
            </div>
            <div className="nav-item active">
              <span className="nav-icon">📅</span>
              <span className="nav-text">Calendar</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('report-management')}>
              <span className="nav-icon">📋</span>
              <span className="nav-text">Report Management</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">👥</span>
              <span className="nav-text">User Management</span>
            </div>
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <div className="user-name">Admin User</div>
                <div className="user-role">Administrator</div>
              </div>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              <span className="logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
          <div className="calendar-header">
            <div className="header-left">
              <h1 className="calendar-title">Calendar</h1>
              <p className="calendar-subtitle">Manage your climate action events and deadlines</p>
            </div>
          <div className="header-right">
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
                onClick={() => setViewMode('month')}
              >
                Month
              </button>
              <button 
                className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
                onClick={() => setViewMode('week')}
              >
                Week
              </button>
              <button 
                className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
                onClick={() => setViewMode('day')}
              >
                Day
              </button>
            </div>
            <button 
              className="add-event-btn"
              onClick={() => {
                setEventForm(prev => ({
                  ...prev,
                  date: new Date().toISOString().split('T')[0]
                }));
                setShowEventModal(true);
                setEditingEvent(null);
              }}
            >
              + Add Event
            </button>
          </div>
        </div>

        <div className="calendar-content">
          {viewMode === 'month' && (
            <div className="month-view">
              <div className="month-navigation">
                <button className="nav-btn" onClick={() => navigateMonth('prev')}>
                  ‹
                </button>
                <h2 className="month-year">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button className="nav-btn" onClick={() => navigateMonth('next')}>
                  ›
                </button>
              </div>

              <div className="calendar-grid">
                {dayNames.map(day => (
                  <div key={day} className="day-header">
                    {day}
                  </div>
                ))}
                
                {generateCalendarDays().map((date, index) => {
                  const dayEvents = date ? getEventsForDate(date) : [];
                  const isToday = date && date.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`calendar-day ${date ? 'has-date' : 'empty'} ${isToday ? 'today' : ''}`}
                      onClick={() => date && handleDateClick(date)}
                    >
                      {date && (
                        <>
                          <div className="day-number">{date.getDate()}</div>
                          <div className="day-events">
                            {dayEvents.slice(0, 3).map((event, idx) => (
                              <div
                                key={idx}
                                className="event-dot"
                                style={{ backgroundColor: getCategoryColor(event.category) }}
                                onClick={(e) => handleEventClick(event, e)}
                                title={event.title}
                              />
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="more-events">
                                +{dayEvents.length - 3}
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
          )}

          {viewMode === 'week' && (
            <div className="week-view">
              <div className="week-navigation">
                <button className="nav-btn" onClick={() => navigateMonth('prev')}>
                  ‹
                </button>
                <h2 className="week-title">This Week</h2>
                <button className="nav-btn" onClick={() => navigateMonth('next')}>
                  ›
                </button>
              </div>
              <div className="week-grid">
                {/* Week view implementation */}
                <div className="week-placeholder">Week view coming soon...</div>
              </div>
            </div>
          )}

          {viewMode === 'day' && (
            <div className="day-view">
              <div className="day-navigation">
                <button className="nav-btn" onClick={() => navigateMonth('prev')}>
                  ‹
                </button>
                <h2 className="day-title">Today</h2>
                <button className="nav-btn" onClick={() => navigateMonth('next')}>
                  ›
                </button>
              </div>
              <div className="day-grid">
                {/* Day view implementation */}
                <div className="day-placeholder">Day view coming soon...</div>
              </div>
            </div>
          )}

          {/* Events List */}
          <div className="events-list">
            <h3 className="events-list-title">Upcoming Events</h3>
            <div className="events-container">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 10)
                .map(event => (
                  <div key={event.id} className="event-item">
                    <div className="event-item-header">
                      <h4 className="event-item-title">{event.title}</h4>
                      <span 
                        className="event-priority"
                        style={{ backgroundColor: getPriorityColor(event.priority) }}
                      >
                        {event.priority}
                      </span>
                    </div>
                    <div className="event-item-details">
                      <div className="event-datetime">
                        📅 {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      {event.location && (
                        <div className="event-location">📍 {event.location}</div>
                      )}
                      {event.description && (
                        <div className="event-description">{event.description}</div>
                      )}
                    </div>
                    <div className="event-item-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEventClick(event, { stopPropagation: () => {} })}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              {events.filter(event => new Date(event.date) >= new Date()).length === 0 && (
                <div className="no-events">No upcoming events</div>
              )}
            </div>
          </div>
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="event-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                <button className="close-btn" onClick={handleCloseModal}>×</button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="event-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Event Title *</label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={eventForm.category}
                      onChange={(e) => setEventForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Date *</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Time</label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={eventForm.location}
                      onChange={(e) => setEventForm(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Event location"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      value={eventForm.priority}
                      onChange={(e) => setEventForm(prev => ({ ...prev, priority: e.target.value }))}
                    >
                      {priorities.map(pri => (
                        <option key={pri.value} value={pri.value}>{pri.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    placeholder="Event description..."
                  />
                </div>
                
                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={eventForm.reminder}
                      onChange={(e) => setEventForm(prev => ({ ...prev, reminder: e.target.checked }))}
                    />
                    Set reminder
                  </label>
                  {eventForm.reminder && (
                    <select
                      value={eventForm.reminderTime}
                      onChange={(e) => setEventForm(prev => ({ ...prev, reminderTime: e.target.value }))}
                      className="reminder-select"
                    >
                      <option value="5">5 minutes before</option>
                      <option value="15">15 minutes before</option>
                      <option value="30">30 minutes before</option>
                      <option value="60">1 hour before</option>
                      <option value="1440">1 day before</option>
                    </select>
                  )}
                </div>
                
                <div className="modal-actions">
                  {editingEvent && (
                    <button 
                      type="button" 
                      className="delete-modal-btn"
                      onClick={() => handleDeleteEvent(editingEvent.id)}
                    >
                      Delete
                    </button>
                  )}
                  <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingEvent ? 'Update' : 'Create'} Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default Calendar;
