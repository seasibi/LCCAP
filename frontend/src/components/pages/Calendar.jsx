import React, { useState } from 'react';

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    eventName: '',
    pillar: '',
    office: '',
    date: '',
    duration: '',
    status: 'Planned'
  });

  const pillars = ['Climate Adaptation', 'Mitigation', 'Resilience', 'Sustainability'];
  const offices = ['CEPMO', 'City Planning', 'Engineering', 'Environmental'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleAddEvent = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(date);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0]
    });
    setShowEventForm(true);
  };

  const handleSaveEvent = () => {
    console.log('Saving event:', formData);
    // Handle event saving logic here
    setShowEventForm(false);
    setFormData({
      eventName: '',
      pillar: '',
      office: '',
      date: '',
      duration: '',
      status: 'Planned'
    });
  };

  const handleCancelEvent = () => {
    setShowEventForm(false);
    setSelectedDate(null);
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
      
      days.push(
        <div 
          key={day} 
          className={`aspect-square flex items-center justify-center border rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium relative
            ${isToday ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300'}`}
        >
          {day}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddEvent(day);
            }}
            className="absolute top-2 right-2 p-1 opacity-30 hover:opacity-100 transition-opacity duration-200 rounded hover:bg-green-100"
          >
            <PlusIcon />
          </button>
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
        <div className="col-span-3 bg-white rounded-lg shadow-md p-6 overflow-hidden flex flex-col">
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
                    <option value="">All Pillars</option>
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
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-green-700 mb-2">Create Event</h2>
                <p className="text-gray-600 text-sm">
                  {selectedDate && `Event for ${selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
                </p>
              </div>
              
              <div className="space-y-4 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={formData.eventName}
                    onChange={(e) => setFormData({...formData, eventName: e.target.value})}
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
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 2 hours, 1 day"
                  />
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
        <div className="col-span-7 bg-white rounded-lg shadow-md p-6 overflow-hidden flex flex-col">
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
