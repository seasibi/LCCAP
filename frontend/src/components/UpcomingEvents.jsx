import React from 'react';
import { FiCalendar, FiMapPin, FiHome } from 'react-icons/fi';
import { upcomingEvents } from '../data/mockData';

const UpcomingEvents = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventColor = (index) => {
    const colors = ['#2E7D32', '#1E88E5', '#66BB6A', '#1E88E5', '#2E7D32'];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <div
            key={event.id}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {/* Date indicator */}
            <div className="flex-shrink-0">
              <div
                className="w-12 h-12 rounded-lg flex flex-col items-center justify-center text-white"
                style={{ backgroundColor: getEventColor(index) }}
              >
                <span className="text-xs font-medium">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                </span>
                <span className="text-lg font-bold">
                  {new Date(event.date).getDate()}
                </span>
              </div>
            </div>

            {/* Event details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm mb-1">
                {event.title}
              </h4>
              
              <div className="flex items-center text-xs text-gray-500 space-x-3">
                <div className="flex items-center">
                  <FiHome className="mr-1" />
                  <span>{event.office}</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex-shrink-0">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getEventColor(index) }}
              />
            </div>
          </div>
        ))}
      </div>

      {upcomingEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FiCalendar className="mx-auto text-2xl mb-2 text-gray-300" />
          <p className="text-sm">No upcoming events</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
