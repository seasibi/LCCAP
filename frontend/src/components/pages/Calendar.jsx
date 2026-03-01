import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-[48px] border border-gray-200 bg-gray-50 rounded-lg"></div>
      );
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`min-h-[48px] flex items-center justify-center border rounded-lg cursor-pointer transition-all duration-200 text-sm font-medium
            ${isToday ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300'}`}
        >
          {day}
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
    <div className="p-6 h-full overflow-hidden">
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-green-700">Calendar</h1>
            <p className="text-gray-600">Simple calendar view</p>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors" onClick={() => navigateMonth('prev')}>
            ‹
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button className="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-colors" onClick={() => navigateMonth('next')}>
            ›
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-sm p-6 overflow-auto">
          <div className="grid grid-cols-7 gap-3 mb-3 min-w-[600px]">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-sm text-gray-600 p-4 bg-green-50 rounded-lg min-h-[48px] flex items-center justify-center">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-3 min-w-[600px]">
            {generateCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
