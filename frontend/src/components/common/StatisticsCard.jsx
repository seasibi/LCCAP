import React from 'react';
import { getStatisticsCardClasses } from '../../utils/styleUtils';

const StatisticsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  cardType = 'leadingOffice',
  valueSize = 'text-3xl',
  titleSize = 'text-sm'
}) => {
  const getCardColors = (type) => {
    const colorMap = {
      leadingOffice: {
        text: 'text-blue-700',
        value: 'text-blue-900',
        bg: 'bg-blue-600'
      },
      accomplishment: {
        text: 'text-emerald-700',
        value: 'text-emerald-900',
        bg: 'bg-emerald-600'
      },
      departments: {
        text: 'text-blue-700',
        value: 'text-blue-900',
        bg: 'bg-blue-600'
      },
      projects: {
        text: 'text-teal-700',
        value: 'text-teal-900',
        bg: 'bg-teal-600'
      }
    };
    return colorMap[cardType] || colorMap.leadingOffice;
  };

  const colors = getCardColors(cardType);

  return (
    <div className={getStatisticsCardClasses(cardType)}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${titleSize} ${colors.text} font-medium`}>{title}</p>
          <p className={`${valueSize} font-bold ${colors.value} mt-1`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`${colors.bg} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
