import React, { useState, useEffect } from 'react';

const ReportManagement = () => {
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
    <div className="min-h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Report Management</h1>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2" onClick={() => setShowModal(true)}>
              <span>+</span>
              Add New Report
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
              <option value="author">Sort by Author</option>
              <option value="downloads">Sort by Downloads</option>
            </select>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="text-center">
              <span className="block text-2xl font-bold text-green-700">{reports.length}</span>
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold text-green-700">{reports.filter(r => r.status === 'published').length}</span>
              <span className="text-sm text-gray-500">Published</span>
            </div>
          </div>
        </div>

        {/* Empty Content Area */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-6xl mb-4 opacity-50">📄</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No reports available.</h3>
          <button 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            onClick={() => setShowModal(true)}
          >
            Add Report
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-xl flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {editingReport ? 'Edit Report' : 'Add New Report'}
              </h3>
              <button 
                className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button 
                  type="button" 
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingReport ? 'Update' : 'Create'} Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportManagement;
