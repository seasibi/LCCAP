import React, { useState } from 'react';
import baguioLogo from '../../assets/images/baguio-logo.png';
import parkBackground from '../../assets/images/bg-park.jpeg';
import Header from '../layout/Header';
import '../../Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
      <Header minimal={true} />
      <div className="login-container">
        {/* Background with park image */}
        <div className="background-elements">
          <div className="park-background" style={{ backgroundImage: `url(${parkBackground})` }}></div>
          <div className="background-overlay"></div>
        </div>

        {/* Login Card */}
        <div className="login-card">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo">
              <img src={baguioLogo} alt="Baguio City Logo" className="logo-image" />
            </div>
          </div>

          {/* Header */}
          <div className="login-header">
            <h1 className="office-title">City Environment and Parks Management Office</h1>
            <h2 className="system-title">Local Climate Change Action Plan</h2>
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
                <p className="loading-text">Nurturing a Sustainable Future...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="login-footer">
          <div className="footer-content">
            <svg className="footer-leaf" viewBox="0 0 24 24" fill="#4a7c59">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
            <span> 2026 City Environment and Parks Management Office</span>
            <svg className="footer-leaf" viewBox="0 0 24 24" fill="#4a7c59">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;
