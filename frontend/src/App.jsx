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
import { ToastProvider, useToast } from './context/ToastContext';
import ToastContainer from './components/common/ToastContainer';
import './App.css'

// AppContent component that uses toast context
function AppContent() {
  const { toasts, removeToast } = useToast();
  
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
        return <Dashboard onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'accomplishment':
        return <Accomplishment onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'calendar':
        return <Calendar onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'report-management':
        return <ReportManagement onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'user-management':
        return <UserManagement onLogout={handleLogout} navigateToPage={navigateToPage} />;
      default:
        return <Dashboard onLogout={handleLogout} navigateToPage={navigateToPage} />;
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
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      </div>
    </ErrorBoundary>
  );
}

// Main App component wrapped with ToastProvider
function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App
