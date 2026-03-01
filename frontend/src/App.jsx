import React, { useState, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { PageLoading } from './components/LoadingStates';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Accomplishment from './components/pages/Accomplishment';
import Calendar from './components/pages/Calendar';
import ReportManagement from './components/pages/ReportManagement';
import UserManagement from './components/pages/UserManagement';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import { routes } from './router/RouteConfig';
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (loginData) => {
    console.log('Login successful:', loginData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    console.log('Logout initiated');
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const navigateToPage = (pageId) => {
    setCurrentPage(pageId);
  };

  // Render the current page component based on the current page ID
  const renderCurrentPage = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'accomplishment':
        return <Accomplishment />;
      case 'calendar':
        return <Calendar />;
      case 'report-management':
        return <ReportManagement />;
      case 'user-management':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        {isLoggedIn ? (
          <MainLayout 
            onLogout={handleLogout} 
            navigateToPage={navigateToPage} 
            currentPage={currentPage}
          >
            <Suspense fallback={<PageLoading message="Loading page..." />}>
              {renderCurrentPage()}
            </Suspense>
          </MainLayout>
        ) : (
          <AuthLayout>
            <Suspense fallback={<PageLoading message="Loading login..." />}>
              <Login onLogin={handleLogin} />
            </Suspense>
          </AuthLayout>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App
