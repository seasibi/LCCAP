import React from 'react';
import { lccapPillars } from '../data/mockData';

const ProgressChart = () => {
  const getProgressColor = (progress) => {
    if (progress >= 70) return '#2E7D32';
    if (progress >= 50) return '#66BB6A';
    if (progress >= 30) return '#FFA726';
    return '#EF5350';
  };

  const getProgressWidth = (progress) => {
    return `${progress}%`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">LCCAP Progress</h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium">
          View Details
        </button>
      </div>

      <div className="space-y-4">
        {lccapPillars.map((pillar, index) => (
          <div key={index} className="space-y-2">
            {/* Pillar name and percentage */}
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">
                {pillar.name}
              </h4>
              <span 
                className="text-sm font-semibold"
                style={{ color: getProgressColor(pillar.progress) }}
              >
                {pillar.progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative">
              {/* Background bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                {/* Progress fill */}
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: getProgressWidth(pillar.progress),
                    backgroundColor: pillar.color
                  }}
                />
              </div>
              
              {/* Progress indicator dots */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full flex justify-between px-1">
                  {[25, 50, 75, 100].map((milestone) => (
                    <div
                      key={milestone}
                      className="w-1 h-1 bg-white rounded-full"
                      style={{
                        opacity: pillar.progress >= milestone ? 1 : 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress status text */}
            <div className="text-xs text-gray-500">
              {pillar.progress >= 70 && 'On Track'}
              {pillar.progress >= 50 && pillar.progress < 70 && 'In Progress'}
              {pillar.progress >= 30 && pillar.progress < 50 && 'Needs Attention'}
              {pillar.progress < 30 && 'Critical'}
            </div>
          </div>
        ))}
      </div>

      {/* Overall progress summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Overall Progress
          </span>
          <span className="text-sm font-semibold text-green-600">
            {Math.round(lccapPillars.reduce((acc, pillar) => acc + pillar.progress, 0) / lccapPillars.length)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${Math.round(lccapPillars.reduce((acc, pillar) => acc + pillar.progress, 0) / lccapPillars.length)}%`,
              backgroundColor: '#2E7D32'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
