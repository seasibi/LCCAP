import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';

const ReportManagement = ({ onLogout, navigateToPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (page) => {
    if (navigateToPage) {
      navigateToPage(page);
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    author: '',
    status: 'draft',
    file: null
  });

  const categories = [
    'Environmental Assessment',
    'Climate Impact',
    'Policy Analysis',
    'Community Report',
    'Technical Study',
    'Annual Report',
    'Research Paper',
    'Other'
  ];

  const statuses = [
    { value: 'draft', label: 'Draft', color: '#6c757d' },
    { value: 'review', label: 'Under Review', color: '#ffc107' },
    { value: 'approved', label: 'Approved', color: '#28a745' },
    { value: 'published', label: 'Published', color: '#17a2b8' },
    { value: 'archived', label: 'Archived', color: '#6f42c1' }
  ];

  // Load sample reports
  useEffect(() => {
    const sampleReports = [
      {
        id: 1,
        title: 'Q1 2024 Environmental Impact Assessment',
        category: 'Environmental Assessment',
        description: 'Comprehensive analysis of environmental impact for Q1 2024',
        date: '2024-03-15',
        author: 'Dr. Sarah Chen',
        status: 'published',
        downloads: 145,
        size: '2.4 MB'
      },
      {
        id: 2,
        title: 'Climate Change Adaptation Strategies',
        category: 'Climate Impact',
        description: 'Strategic recommendations for climate adaptation',
        date: '2024-03-10',
        author: 'Prof. Michael Torres',
        status: 'approved',
        downloads: 89,
        size: '1.8 MB'
      },
      {
        id: 3,
        title: 'Community Engagement Report',
        category: 'Community Report',
        description: 'Summary of community outreach activities and feedback',
        date: '2024-03-05',
        author: 'Lisa Anderson',
        status: 'review',
        downloads: 23,
        size: '3.1 MB'
      },
      {
        id: 4,
        title: 'Renewable Energy Implementation Study',
        category: 'Technical Study',
        description: 'Technical analysis of renewable energy implementation',
        date: '2024-02-28',
        author: 'Dr. James Wilson',
        status: 'draft',
        downloads: 0,
        size: '4.2 MB'
      },
      {
        id: 5,
        title: '2023 Annual Climate Action Report',
        category: 'Annual Report',
        description: 'Complete annual report on climate action initiatives',
        date: '2024-01-15',
        author: 'Maria Rodriguez',
        status: 'published',
        downloads: 312,
        size: '5.7 MB'
      }
    ];
    setReports(sampleReports);
  }, []);

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
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const reportData = {
      id: editingReport ? editingReport.id : Date.now(),
      ...formData,
      downloads: editingReport ? editingReport.downloads : 0,
      size: formData.file ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB` : '0 MB'
    };

    if (editingReport) {
      setReports(prev => prev.map(report => 
        report.id === editingReport.id ? reportData : report
      ));
    } else {
      setReports(prev => [reportData, ...prev]);
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(prev => prev.filter(report => report.id !== id));
    }
  };

  const handleDownload = (report) => {
    // Simulate download
    setReports(prev => prev.map(r => 
      r.id === report.id ? { ...r, downloads: r.downloads + 1 } : r
    ));
    alert(`Downloading: ${report.title}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingReport(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      date: '',
      author: '',
      status: 'draft',
      file: null
    });
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      category: report.category,
      description: report.description,
      date: report.date,
      author: report.author,
      status: report.status,
      file: null
    });
    setShowModal(true);
  };

  // Filter and sort reports
  const filteredReports = reports
    .filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'downloads') return b.downloads - a.downloads;
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      return 0;
    });

  const getStatusColor = (status) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.color : '#6c757d';
  };

  const getStatusLabel = (status) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  return (
    <>
      <style jsx>{`
        /* Report Management Styles */
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8faf8 0%, #e8f5e8 50%, #d4edd4 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background: linear-gradient(135deg, #2d5016, #4a7c59);
          color: white;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: fixed;
          height: 100vh;
          z-index: 999;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar.closed {
          transform: translateX(-260px);
        }

        .sidebar-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          font-size: 1.5rem;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: rgba(255, 255, 255, 0.8);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .nav-item.active {
          background: #4a7c59;
          color: white;
        }

        .nav-icon {
          font-size: 1.1rem;
          width: 20px;
        }

        .nav-text {
          font-size: 0.9rem;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .user-role {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 0.85rem;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .logout-icon {
          font-size: 1rem;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          transition: all 0.3s ease;
          min-height: 100vh;
        }

        .main-content.with-sidebar {
          margin-left: 260px;
        }

        .main-content.full-width {
          margin-left: 0;
        }

        /* Header */
        .report-header {
          background: white;
          padding: 2rem;
          border-bottom: 1px solid #e8f5e8;
          box-shadow: 0 2px 4px rgba(45, 80, 22, 0.05);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2d5016;
          margin: 0;
        }

        .add-report-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #4a7c59, #2d5016);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .add-report-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        /* Filters */
        .filters-section {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 1rem;
          align-items: end;
        }

        .search-box {
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.9rem;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .stats-container {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d5016;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #4a7c59;
          text-transform: uppercase;
        }

        /* Reports Grid */
        .reports-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .report-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(45, 80, 22, 0.08);
          border: 1px solid #e8f5e8;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .report-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(45, 80, 22, 0.15);
        }

        .report-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e8f5e8;
        }

        .report-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d5016;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .report-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .report-category {
          font-size: 0.8rem;
          color: #4a7c59;
          background: #e8f5e8;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .report-status {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          text-transform: uppercase;
        }

        .report-description {
          font-size: 0.9rem;
          color: #6c757d;
          line-height: 1.5;
          margin: 0;
        }

        .report-footer {
          padding: 1rem 1.5rem;
          background: #f8faf8;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .report-info {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: #6c757d;
        }

        .report-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.4rem 0.8rem;
          border: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .download-btn {
          background: #4a7c59;
          color: white;
        }

        .download-btn:hover {
          background: #2d5016;
        }

        .edit-btn {
          background: #ffc107;
          color: #000;
        }

        .edit-btn:hover {
          background: #e0a800;
        }

        .delete-btn {
          background: #dc3545;
          color: white;
        }

        .delete-btn:hover {
          background: #c82333;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 1rem;
        }

        .modal {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          padding: 1.5rem;
          background: linear-gradient(135deg, #4a7c59, #2d5016);
          color: white;
          border-radius: 16px 16px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .close-btn:hover {
          opacity: 1;
        }

        .modal-body {
          padding: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-weight: 600;
          color: #2d5016;
          font-size: 0.9rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 0.75rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 0.9rem;
          font-family: inherit;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-file {
          padding: 0.75rem;
          border: 2px dashed #e9ecef;
          border-radius: 8px;
          background: #f8f9fa;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-file:hover {
          border-color: #4a7c59;
          background: #f0f8f0;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
          margin-top: 1rem;
        }

        .cancel-btn {
          padding: 0.75rem 1.5rem;
          background: #6c757d;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: #5a6268;
        }

        .submit-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #4a7c59, #2d5016);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #6c757d;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-description {
          font-size: 1rem;
          margin-bottom: 2rem;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .reports-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .header-top {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .filters-section {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stats-container {
            justify-content: space-around;
          }

          .reports-grid {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .modal-actions {
            flex-direction: column;
          }

          .cancel-btn,
          .submit-btn {
            width: 100%;
          }

          .sidebar {
            transform: translateX(-260px);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .main-content.with-sidebar {
            margin-left: 0;
          }
        }

        @media (max-width: 480px) {
          .report-header {
            padding: 1rem;
          }

          .reports-container {
            padding: 1rem;
          }

          .page-title {
            font-size: 1.5rem;
          }

          .report-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .report-actions {
            justify-content: center;
          }
        }
      `}</style>

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
            <div className="nav-item" onClick={() => handleNavigation('accomplishment')}>
              <span className="nav-icon">🏆</span>
              <span className="nav-text">Accomplishment</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('calendar')}>
              <span className="nav-icon">📅</span>
              <span className="nav-text">Calendar</span>
            </div>
            <div className="nav-item active">
              <span className="nav-icon">📋</span>
              <span className="nav-text">Report Management</span>
            </div>
            <div className="nav-item" onClick={() => handleNavigation('user-management')}>
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
          <div className="report-header">
            <div className="header-content">
              <div className="header-top">
                <h1 className="page-title">Report Management</h1>
                <button className="add-report-btn" onClick={() => setShowModal(true)}>
                  <span>+</span>
                  Add New Report
                </button>
              </div>

              <div className="filters-section">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select
                  className="filter-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>

                <select
                  className="filter-select"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select
                  className="filter-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="author">Sort by Author</option>
                  <option value="downloads">Sort by Downloads</option>
                </select>

                <div className="stats-container">
                  <div className="stat-item">
                    <span className="stat-value">{reports.length}</span>
                    <span className="stat-label">Total</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{reports.filter(r => r.status === 'published').length}</span>
                    <span className="stat-label">Published</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reports-container">
            {filteredReports.length > 0 ? (
              <div className="reports-grid">
                {filteredReports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <h3 className="report-title">{report.title}</h3>
                      <div className="report-meta">
                        <span className="report-category">{report.category}</span>
                        <span 
                          className="report-status"
                          style={{ backgroundColor: getStatusColor(report.status), color: 'white' }}
                        >
                          {getStatusLabel(report.status)}
                        </span>
                      </div>
                      <p className="report-description">{report.description}</p>
                    </div>
                    <div className="report-footer">
                      <div className="report-info">
                        <span>📅 {new Date(report.date).toLocaleDateString()}</span>
                        <span>👤 {report.author}</span>
                        <span>📊 {report.downloads} downloads</span>
                        <span>💾 {report.size}</span>
                      </div>
                      <div className="report-actions">
                        <button 
                          className="action-btn download-btn"
                          onClick={() => handleDownload(report)}
                        >
                          ⬇
                        </button>
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(report)}
                        >
                          ✏️
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(report.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <h2 className="empty-title">No Reports Found</h2>
                <p className="empty-description">
                  {searchTerm || filterStatus !== 'all' || filterCategory !== 'all'
                    ? 'Try adjusting your filters or search terms'
                    : 'Get started by adding your first report'}
                </p>
                <button className="add-report-btn" onClick={() => setShowModal(true)}>
                  <span>+</span>
                  Add Your First Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Report Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingReport ? 'Edit Report' : 'Add New Report'}
              </h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Report Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter report title"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Author *</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Author name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Upload File</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Provide a detailed description of the report"
                  rows={4}
                  required
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingReport ? 'Update' : 'Create'} Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportManagement;
