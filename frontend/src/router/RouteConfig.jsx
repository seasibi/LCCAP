import React from 'react';
import Dashboard from '../components/pages/Dashboard';
import Accomplishment from '../components/pages/Accomplishment';
import Calendar from '../components/pages/Calendar';
import ReportManagement from '../components/pages/ReportManagement';
import UserManagement from '../components/pages/UserManagement';
import Login from '../components/pages/Login';

// Route configuration for the application
export const routes = {
  public: [
    {
      path: '/login',
      component: Login,
      name: 'Login'
    }
  ],
  protected: [
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'Dashboard'
    },
    {
      path: '/accomplishment',
      component: Accomplishment,
      name: 'Accomplishment'
    },
    {
      path: '/calendar',
      component: Calendar,
      name: 'Calendar'
    },
    {
      path: '/report-management',
      component: ReportManagement,
      name: 'Report Management'
    },
    {
      path: '/user-management',
      component: UserManagement,
      name: 'User Management'
    }
  ]
};

// Navigation items for sidebar
export const navigationItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { id: 'accomplishment', icon: '🏆', label: 'Accomplishment', path: '/accomplishment' },
  { id: 'calendar', icon: '📅', label: 'Calendar', path: '/calendar' },
  { id: 'report-management', icon: '📋', label: 'Report Management', path: '/report-management' },
  { id: 'user-management', icon: '👥', label: 'User Management', path: '/user-management' }
];

// Helper function to get component by path
export const getComponentByPath = (path) => {
  const allRoutes = [...routes.public, ...routes.protected];
  const route = allRoutes.find(r => r.path === path);
  return route ? route.component : null;
};

// Helper function to get route name by path
export const getRouteNameByPath = (path) => {
  const allRoutes = [...routes.public, ...routes.protected];
  const route = allRoutes.find(r => r.path === path);
  return route ? route.name : 'Unknown';
};
