import React, { useState, useEffect } from 'react';
import baguioLogo from '../../assets/images/baguio-logo.png';
import parkBackground from '../../assets/images/bg-park.jpeg';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Prevent scroll and zoom
  useEffect(() => {
    // Prevent scroll
    const preventScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Prevent zoom with Ctrl+/-/+/0
    const preventZoom = (e) => {
      if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Prevent pinch zoom
    const preventPinchZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('keydown', preventZoom);
    document.addEventListener('touchstart', preventPinchZoom, { passive: false });

    // Set viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Cleanup
    return () => {
      document.removeEventListener('wheel', preventScroll);
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('keydown', preventZoom);
      document.removeEventListener('touchstart', preventPinchZoom);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', formData);
      // Call the onLogin function passed from App component
      onLogin(formData);
    }, 2000);
  };

  return (
    <>
      {/* Header */}
      <Header minimal={true} />
      
      <style jsx>{`
        /* Login Page Styles */
        .login-container {
          position: fixed;
          top: 64px; /* Account for header height */
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: calc(100vh - 64px); /* Account for header height */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          padding: 80px 20px 60px 20px;
          box-sizing: border-box;
          background: #F5F7F6;
        }

        body {
          overflow: hidden;
          touch-action: none;
          zoom: 1;
          margin: 0;
          padding: 0;
        }

        /* Login Card - Perfect Centering */
        .login-card {
          position: relative;
          z-index: 10;
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 100%;
          max-width: 320px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        /* Logo Container - Centered */
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
          width: 100%;
        }

        .logo {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 12px rgba(46, 125, 50, 0.25);
        }

        .logo-image {
          width: 35px;
          height: 35px;
          object-fit: cover;
          border-radius: 50%;
        }

        /* Login Header - Centered */
        .login-header {
          text-align: center;
          margin-bottom: 15px;
          width: 100%;
        }

        .office-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #2E7D32;
          margin-bottom: 4px;
          line-height: 1.2;
          text-align: center;
        }

        .system-title {
          font-size: 0.85rem;
          font-weight: 500;
          color: #424242;
          line-height: 1.3;
          text-align: center;
        }

        /* Form Styles - Centered */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: center;
          width: 100%;
          align-items: center;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: center;
          width: 100%;
          align-items: center;
        }

        .form-input {
          width: 100%;
          max-width: 280px;
          padding: 8px 12px;
          border: 2px solid #E0E0E0;
          border-radius: 8px;
          font-size: 0.85rem;
          background: #F5F5F5;
          transition: all 0.3s ease;
          outline: none;
          text-align: center;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #4CAF50;
          background: white;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
          text-align: center;
        }

        .form-input.error {
          border-color: #F44336;
          background: #FFEBEE;
          text-align: center;
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          text-align: center;
        }

        .error-message {
          color: #F44336;
          font-size: 0.75rem;
          margin-top: 2px;
          text-align: center;
        }

        /* Form Options - Centered */
        .form-options {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 6px;
          text-align: center;
          width: 100%;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.75rem;
          color: #424242;
          text-align: center;
        }

        .checkbox-container input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 16px;
          height: 16px;
          border: 2px solid #E0E0E0;
          border-radius: 3px;
          margin-right: 6px;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark {
          background: #4CAF50;
          border-color: #4CAF50;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 6px;
          border: solid white;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
        }

        .forgot-password {
          color: #4CAF50;
          text-decoration: none;
          font-size: 0.75rem;
          transition: color 0.3s ease;
          text-align: center;
        }

        .forgot-password:hover {
          color: #2E7D32;
          text-decoration: underline;
        }

        /* Login Button - Centered */
        .login-button {
          width: 100%;
          max-width: 280px;
          padding: 10px;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 3px 8px rgba(46, 125, 50, 0.25);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.35);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Loading Overlay - Centered */
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        .loading-animation {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .pine-tree {
          position: relative;
          width: 60px;
          height: 80px;
        }

        .tree-trunk {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 30px;
          background: #8D6E63;
          border-radius: 2px;
        }

        .tree-leaves {
          position: absolute;
          border-radius: 50%;
          background: #4CAF50;
        }

        .tree-leaves.layer-1 {
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
        }

        .tree-leaves.layer-2 {
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
        }

        .tree-leaves.layer-3 {
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
        }

        .loading-text {
          color: #424242;
          font-size: 1rem;
          font-weight: 500;
          margin-top: 10px;
          text-align: center;
        }

        /* Background Elements - Hidden */
        .background-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          display: none;
        }

        .park-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.8);
          display: none;
        }

        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(46, 125, 50, 0.9), rgba(76, 175, 80, 0.8));
          z-index: 1;
          display: none;
        }

        body {
          overflow: hidden;
          touch-action: none;
          zoom: 1;
          margin: 0;
          padding: 0;
        }

        /* Login Card */
        .login-card {
          position: relative;
          z-index: 10;
          background: white;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
          padding: 20px;
          width: 100%;
          max-width: 380px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Logo Container */
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
        }

        .logo {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 12px rgba(46, 125, 50, 0.25);
        }

        .logo-image {
          width: 35px;
          height: 35px;
          object-fit: cover;
          border-radius: 50%;
        }

        /* Professional Login Header */
        .login-header {
          text-align: center;
          margin-bottom: 5px;
          padding: 20px 0;
        }

        .logo-container {
          margin-bottom: 20px;
        }

        .logo-wrapper {
          display: inline-block;
          padding: 12px;
          background: linear-gradient(135deg, #f5f5f5 0%, #e8f5e8 100%);
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.15);
          border: 2px solid #4caf50;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-wrapper:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(46, 125, 50, 0.25);
        }

        .logo-image {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 50%;
        }

        .title-section {
          margin-top: 15px;
        }

        .main-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #1b5e20;
          margin-bottom: 8px;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .subtitle-divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #4caf50 0%, #2e7d32 100%);
          margin: 12px auto;
          border-radius: 2px;
        }

        .office-subtitle {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2e7d32;
          margin-bottom: 1px;
          line-height: 1.3;
        }

        .government-text {
          font-size: 0.8rem;
          font-weight: 500;
          color: #616161;
          margin: 0;
          font-style: italic;
        }

        /* Form Styles */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .form-input {
          width: 100%;
          padding: 5px 12px;
          border: 2px solid #E0E0E0;
          border-radius: 8px;
          font-size: 0.85rem;
          background: #F5F5F5;
          transition: all 0.3s ease;
          outline: none;
          text-align: left;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #4CAF50;
          background: white;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
          text-align: left;
        }

        .form-input.error {
          border-color: #F44336;
          background: #FFEBEE;
          text-align: left;
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          text-align: left;
        }

        .error-message {
          color: #F44336;
          font-size: 0.75rem;
          margin-top: 2px;
          text-align: left;
        }

        /* Form Options */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          text-align: left;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 0.75rem;
          color: #424242;
          text-align: left;
        }

        .checkbox-container input[type="checkbox"] {
          display: none;
        }

        .checkmark {
          width: 16px;
          height: 16px;
          border: 2px solid #E0E0E0;
          border-radius: 3px;
          margin-right: 6px;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark {
          background: #4CAF50;
          border-color: #4CAF50;
        }

        .checkbox-container input[type="checkbox"]:checked + .checkmark::after {
          content: '';
          position: absolute;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 6px;
          border: solid white;
          border-width: 0 1.5px 1.5px 0;
          transform: rotate(45deg);
        }

        .forgot-password {
          color: #4CAF50;
          text-decoration: none;
          font-size: 0.75rem;
          transition: color 0.3s ease;
          text-align: right;
        }

        .forgot-password:hover {
          color: #2E7D32;
          text-decoration: underline;
        }

        /* Login Button */
        .login-button {
          width: 100%;
          padding: 10px;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 3px 8px rgba(46, 125, 50, 0.25);
          text-align: center;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.35);
          text-align: center;
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          text-align: center;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Loading Overlay */
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
        }

        .loading-animation {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .pine-tree {
          position: relative;
          width: 60px;
          height: 80px;
        }

        .tree-trunk {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 30px;
          background: #8D6E63;
          border-radius: 2px;
        }

        .tree-leaves {
          position: absolute;
          border-radius: 50%;
          background: #4CAF50;
        }

        .tree-leaves.layer-1 {
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
        }

        .tree-leaves.layer-2 {
          bottom: 35px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
        }

        .tree-leaves.layer-3 {
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 20px;
        }

        .loading-text {
          color: #424242;
          font-size: 1rem;
          font-weight: 500;
          margin-top: 10px;
        }

        /* Footer Positioning */
        .footer-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 20;
          background: linear-gradient(135deg, #2E7D32, #4CAF50);
          color: white;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
          border: 2px solid rgba(76, 175, 80, 0.4);
          borderTop: 4px solid rgba(76, 175, 80, 0.6);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .footer-icon {
          font-size: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .footer-text h3 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .footer-text p {
          font-size: 0.75rem;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .footer-info {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .footer-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .footer-item:hover {
          color: rgba(255, 255, 255, 1);
          transform: translateY(-1px);
        }

        .footer-item .footer-icon {
          font-size: 1rem;
          opacity: 0.8;
        }

        .footer-item:hover .footer-icon {
          opacity: 1;
        }

        /* Responsive Footer */
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .footer-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
      
      <Header minimal={true} />
      <div className="login-container">
        {/* Background with park image */}
        <div className="background-elements">
          <div className="park-background" style={{ backgroundImage: `url(${parkBackground})` }}></div>
          <div className="background-overlay"></div>
        </div>

        {/* Login Card */}
        <div className="login-card">


          {/* Professional Header */}
          <div className="login-header">
            
            {/* Title Section */}
            <div className="title-section">
              <h1 className="main-title pb-3">Welcome!</h1>
              <h1 className="main-title">Local Climate Change <br/> Action Plan</h1>
              <div className="subtitle-divider"></div>
              <h2 className="office-subtitle">City Environment and Parks Management Office</h2>
              <p className="government-text">City Government of Baguio</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Username Field */}
            <div className="form-group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={`form-input ${errors.username ? 'error' : ''}`}
                aria-label="Username"
                disabled={isLoading}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                aria-label="Password"
                disabled={isLoading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <span className="checkmark"></span>
                Remember Me
              </label>
              <a href="#" className="forgot-password" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="button-content">
                  <div className="loading-spinner"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Loading Animation */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-animation">
                <div className="pine-tree">
                  <div className="tree-trunk"></div>
                  <div className="tree-leaves layer-1"></div>
                  <div className="tree-leaves layer-2"></div>
                  <div className="tree-leaves layer-3"></div>
                </div>
                <p className="loading-text">Loading...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Login;
