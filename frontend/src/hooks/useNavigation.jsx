import { useState } from 'react';
import { navigationItems } from '../router/RouteConfig';

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigateToPage = (pageId) => {
    setCurrentPage(pageId);
  };

  const getCurrentPath = () => {
    const item = navigationItems.find(item => item.id === currentPage);
    return item ? item.path : '/dashboard';
  };

  const getCurrentPageInfo = () => {
    return navigationItems.find(item => item.id === currentPage);
  };

  const isCurrentPage = (pageId) => {
    return currentPage === pageId;
  };

  return {
    currentPage,
    navigateToPage,
    getCurrentPath,
    getCurrentPageInfo,
    isCurrentPage,
    navigationItems
  };
};
