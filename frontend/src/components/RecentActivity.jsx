import React from 'react';
import { FiFileText, FiCalendar, FiHome, FiCheckCircle } from 'react-icons/fi';
import { recentActivities } from '../data/mockData';

const RecentActivity = () => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'event':
        return FiCalendar;
      case 'report':
        return FiFileText;
      case 'office':
        return FiHome;
      default:
        return FiCheckCircle;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'event':
        return '#1E88E5';
      case 'report':
        return '#2E7D32';
      case 'office':
        return '#66BB6A';
      default:
        return '#263238';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const color = getActivityColor(activity.type);
          
          return (
            <div
              key={activity.id}
              className="flex items-start space-x-3 group cursor-pointer"
            >
              {/* Activity icon */}
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon
                    className="text-sm"
                    style={{ color }}
                  />
                </div>
              </div>

              {/* Activity content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 group-hover:text-green-700 transition-colors">
                  {activity.title}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500 space-x-2">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{activity.timestamp}</span>
                </div>
              </div>

              {/* Activity indicator line */}
              {index < recentActivities.length - 1 && (
                <div className="absolute left-4 mt-8 w-0.5 h-4 bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>

      {recentActivities.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <FiCheckCircle className="mx-auto text-2xl mb-2 text-gray-300" />
          <p className="text-sm">No recent activities</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
