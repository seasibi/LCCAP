import React, { useState } from 'react';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Accomplishment from './components/pages/Accomplishment';
import Calendar from './components/pages/Calendar';
import ReportManagement from './components/pages/ReportManagement';
import Header from './components/layout/Header'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = (loginData) => {
    console.log('Login successful:', loginData);
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      {currentPage === 'login' && !isLoggedIn && (
        <Login onLogin={handleLogin} />
      )}
      {currentPage === 'dashboard' && isLoggedIn && (
        <Dashboard 
          onLogout={handleLogout} 
          navigateToPage={navigateToPage} 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      {currentPage === 'accomplishment' && isLoggedIn && (
        <Accomplishment 
          onLogout={handleLogout} 
          navigateToPage={navigateToPage} 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      {currentPage === 'calendar' && isLoggedIn && (
        <Calendar 
          onLogout={handleLogout} 
          navigateToPage={navigateToPage} 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
      {currentPage === 'report-management' && isLoggedIn && (
        <ReportManagement 
          onLogout={handleLogout} 
          navigateToPage={navigateToPage} 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      )}
    </div>
  )
}

export default App
