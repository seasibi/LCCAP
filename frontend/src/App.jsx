import React, { useState, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { PageLoading } from './components/LoadingStates';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import ModernDashboard from './components/pages/ModernDashboard';
import Accomplishment from './components/pages/Accomplishment';
import Calendar from './components/pages/Calendar';
import ReportManagement from './components/pages/ReportManagement';
import UserManagement from './components/pages/UserManagement';
import FoodSecurity from './components/pages/FoodSecurity';
import WaterSufficiency from './components/pages/WaterSufficiency';
import EcologicalStability from './components/pages/EcologicalStability';
import HumanSecurity from './components/pages/HumanSecurity';
import ClimateSmartIndustries from './components/pages/ClimateSmartIndustries';
import SustainableEnergy from './components/pages/SustainableEnergy';
import KnowledgeCapacity from './components/pages/KnowledgeCapacity';
import DataManagement from './components/pages/DataManagement';
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

  const navigateToPage = (pageOrPath) => {
    // Convert path to page ID (e.g., '/food-security' -> 'food-security')
    const pageId = pageOrPath.startsWith('/') ? pageOrPath.substring(1) : pageOrPath;
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
      case 'modern-dashboard':
        return <ModernDashboard />;
      case 'accomplishment':
        return <Accomplishment onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'calendar':
        return <Calendar onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'report-management':
        return <ReportManagement onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'user-management':
        return <UserManagement onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'food-security':
        return <FoodSecurity onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'water-sufficiency':
        return <WaterSufficiency onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'ecological-stability':
        return <EcologicalStability onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'human-security':
        return <HumanSecurity onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'climate-smart-industries':
        return <ClimateSmartIndustries onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'sustainable-energy':
        return <SustainableEnergy onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'knowledge-capacity':
        return <KnowledgeCapacity onLogout={handleLogout} navigateToPage={navigateToPage} />;
      case 'data-management':
        return <DataManagement onLogout={handleLogout} navigateToPage={navigateToPage} />;
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
