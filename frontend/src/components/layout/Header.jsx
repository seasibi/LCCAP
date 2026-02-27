import React from 'react';
import './Header.css';

const Header = ({ title, showSidebarToggle = false, onSidebarToggle = null, minimal = false }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        {showSidebarToggle && (
          <button className="sidebar-toggle" onClick={onSidebarToggle}>
            <span>☰</span>
          </button>
        )}
        <div className="logo-section">
          <div className="logo-icon">🌿</div>
          <div className="logo-text">
            <h1>LCCAP</h1>
            <p>Local Climate Change Action Plan</p>
          </div>
        </div>
      </div>
      <div className="header-right">
        <div className="header-info">
          <span className="info-item">
            <span className="info-icon">🌱</span>
            <span className="info-text">Carbon Neutral 2030</span>
          </span>
          <span className="info-item">
            <span className="info-icon">📊</span>
            <span className="info-text">Real-time Monitoring</span>
          </span>
          <span className="info-item">
            <span className="info-icon">�</span>
            <span className="info-text">Climate Action</span>
          </span>
        </div>
        <div className="header-actions">
          <button className="header-button">
            <span className="button-icon">�</span>
            <span className="button-text">Profile</span>
          </button>
          <button className="header-button">
            <span className="button-icon">⚙️</span>
            <span className="button-text">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
