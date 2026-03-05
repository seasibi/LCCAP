// Utility functions for consistent styling across the LCCAP application
import { pillarColors, statisticsCardColors, textHierarchy } from '../styles/designTokens';

// Get pillar-specific color scheme
export const getPillarColors = (pillarName) => {
  const pillarKey = pillarName?.toLowerCase().replace(/\s+/g, '');
  
  // Map pillar names to keys
  const pillarMap = {
    'foodsecurity': 'foodSecurity',
    'watersufficiency': 'waterSufficiency',
    'ecologicalstability': 'ecologicalStability',
    'humansecurity': 'humanSecurity',
    'climatesmartindustries': 'climateSmartIndustries',
    'sustainableenergy': 'sustainableEnergy',
    'knowledgecapacity': 'knowledgeCapacity',
    'knowledge&capacity': 'knowledgeCapacity'
  };
  
  const key = pillarMap[pillarKey] || 'foodSecurity';
  return pillarColors[key] || pillarColors.foodSecurity;
};

// Get statistics card colors
export const getStatisticsCardColors = (cardType) => {
  return statisticsCardColors[cardType] || statisticsCardColors.leadingOffice;
};

// Apply text hierarchy classes
export const getTextClass = (type) => {
  return textHierarchy[type] || textHierarchy.body;
};

// Generate consistent statistics card classes
export const getStatisticsCardClasses = (cardType) => {
  const colors = getStatisticsCardColors(cardType);
  return `bg-gradient-to-br ${colors.gradient} rounded-lg shadow-md p-6 border ${colors.border}`;
};

// Generate pillar-specific button classes
export const getPillarButtonClasses = (pillarName) => {
  const colors = getPillarColors(pillarName);
  return `px-4 py-2 ${colors.bg} text-white rounded-lg hover:${colors.bg.replace('bg-', 'bg-')} transition-colors flex items-center gap-2`;
};

// Generate consistent page header classes
export const getPageHeaderClasses = () => {
  return textHierarchy.pageTitle + ' mb-2';
};

// Generate section header classes
export const getSectionHeaderClasses = () => {
  return textHierarchy.sectionTitle;
};

// Helper to convert pillar names to URL-friendly format
export const pillarToUrl = (pillarName) => {
  const pillarMap = {
    'Food Security': 'food-security',
    'Water Sufficiency': 'water-sufficiency',
    'Ecological Stability': 'ecological-stability',
    'Human Security': 'human-security',
    'Climate-Smart Industries': 'climate-smart-industries',
    'Sustainable Energy': 'sustainable-energy',
    'Knowledge & Capacity': 'knowledge-capacity'
  };
  
  return pillarMap[pillarName] || pillarName?.toLowerCase().replace(/\s+/g, '-');
};

// Helper to get pillar name from URL
export const urlToPillar = (urlPath) => {
  const urlMap = {
    'food-security': 'Food Security',
    'water-sufficiency': 'Water Sufficiency',
    'ecological-stability': 'Ecological Stability',
    'human-security': 'Human Security',
    'climate-smart-industries': 'Climate-Smart Industries',
    'sustainable-energy': 'Sustainable Energy',
    'knowledge-capacity': 'Knowledge & Capacity'
  };
  
  return urlMap[urlPath] || urlPath;
};
