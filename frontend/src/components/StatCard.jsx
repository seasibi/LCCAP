import React from 'react';
import { FiCalendar, FiCheckCircle, FiUsers, FiActivity } from 'react-icons/fi';

const StatCard = ({ icon: Icon, title, value, subtitle, color = '#2E7D32' }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div 
              className="p-3 rounded-lg mr-4"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon 
                className="text-2xl"
                style={{ color }}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
              <p className="text-sm font-medium text-gray-600">{title}</p>
            </div>
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-2 ml-16">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
