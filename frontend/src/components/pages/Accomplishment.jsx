import React, { useState } from 'react';
import Header from '../layout/Header';
import '../../Accomplishment.css';

const Accomplishment = ({ onLogout, navigateToPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    impact: '',
    metrics: '',
    status: 'completed',
    documents: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    if (navigateToPage) {
      navigateToPage(page);
    }
  };

  const categories = [
    'Environmental Protection',
    'Climate Adaptation',
    'Mitigation Projects',
    'Community Engagement',
    'Policy Implementation',
    'Research & Development',
    'Infrastructure',
    'Education & Awareness'
  ];

  const statusOptions = [
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'planned', label: 'Planned' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      documents: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Accomplishment submitted successfully!');
      setFormData({
        title: '',
        category: '',
        description: '',
        date: '',
        impact: '',
        metrics: '',
        status: 'completed',
        documents: null
      });
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      date: '',
      impact: '',
      metrics: '',
      status: 'completed',
      documents: null
    });
    setSubmitMessage('');
  };

  return (
    <>
      <Header showSidebarToggle={true} onSidebarToggle={toggleSidebar} />
      <div className="dashboard-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <div className="logo">
              <div className="logo-icon">🌿</div>
              <span className="logo-text">LCCAP</span>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-item" onClick={() => handleNavigation('dashboard')}>
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </div>
            <div className="nav-item active">
              <span className="nav-icon">🏆</span>
              <span className="nav-text">Accomplishment</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('calendar')}>
              <span className="nav-icon">📅</span>
              <span className="nav-text">Calendar</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('report-management')}>
              <span className="nav-icon">📋</span>
              <span className="nav-text">Report Management</span>
            </div>
            <div className="nav-item">
              <span className="nav-icon">👥</span>
              <span className="nav-text">User Management</span>
            </div>
          </nav>

          <div className="sidebar-footer">
            <div className="user-profile">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <div className="user-name">Admin User</div>
                <div className="user-role">Administrator</div>
              </div>
            </div>
            <button className="logout-btn" onClick={onLogout}>
              <span className="logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
          <div className="accomplishment-header">
            <h1 className="page-title">Accomplishment Report</h1>
          <p className="page-subtitle">Document and track climate action achievements</p>
        </div>

        <div className="accomplishment-content">
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">Submit Accomplishment</h2>
              <p className="form-description">
                Fill in the details below to document your climate action accomplishment
              </p>
            </div>

            <form onSubmit={handleSubmit} className="accomplishment-form">
              <div className="form-grid">
                {/* Left Column */}
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">
                      Accomplishment Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter accomplishment title"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="date" className="form-label">
                      Completion Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="status" className="form-label">
                      Status *
                    </label>
                    <div className="radio-group">
                      {statusOptions.map(option => (
                        <label key={option.value} className="radio-label">
                          <input
                            type="radio"
                            name="status"
                            value={option.value}
                            checked={formData.status === option.value}
                            onChange={handleInputChange}
                            className="radio-input"
                          />
                          <span className="radio-text">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="description" className="form-label">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Provide a detailed description of the accomplishment"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="impact" className="form-label">
                      Environmental Impact
                    </label>
                    <textarea
                      id="impact"
                      name="impact"
                      value={formData.impact}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Describe the environmental impact and benefits"
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="metrics" className="form-label">
                      Key Metrics & Results
                    </label>
                    <textarea
                      id="metrics"
                      name="metrics"
                      value={formData.metrics}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Quantifiable results, measurements, or achievements"
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="documents" className="form-label">
                      Supporting Documents
                    </label>
                    <input
                      type="file"
                      id="documents"
                      name="documents"
                      onChange={handleFileChange}
                      className="form-file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <small className="form-help">
                      Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB)
                    </small>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                >
                  Reset Form
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Accomplishment'
                  )}
                </button>
              </div>

              {/* Success Message */}
              {submitMessage && (
                <div className="success-message">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Recent Accomplishments */}
          <div className="recent-accomplishments">
            <h3 className="section-title">Recent Accomplishments</h3>
            <div className="accomplishment-list">
              <div className="accomplishment-item">
                <div className="item-header">
                  <h4 className="item-title">Urban Tree Planting Initiative</h4>
                  <span className="item-status completed">Completed</span>
                </div>
                <p className="item-description">
                  Successfully planted 500 trees in urban areas, improving air quality and green coverage.
                </p>
                <div className="item-meta">
                  <span className="item-category">Environmental Protection</span>
                  <span className="item-date">March 15, 2024</span>
                </div>
              </div>

              <div className="accomplishment-item">
                <div className="item-header">
                  <h4 className="item-title">Renewable Energy Workshop</h4>
                  <span className="item-status completed">Completed</span>
                </div>
                <p className="item-description">
                  Conducted community workshop on renewable energy options with 200+ participants.
                </p>
                <div className="item-meta">
                  <span className="item-category">Education & Awareness</span>
                  <span className="item-date">March 10, 2024</span>
                </div>
              </div>

              <div className="accomplishment-item">
                <div className="item-header">
                  <h4 className="item-title">Waste Management System Upgrade</h4>
                  <span className="item-status in-progress">In Progress</span>
                </div>
                <p className="item-description">
                  Implementing advanced waste segregation and recycling system across the city.
                </p>
                <div className="item-meta">
                  <span className="item-category">Infrastructure</span>
                  <span className="item-date">March 1, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Accomplishment;
