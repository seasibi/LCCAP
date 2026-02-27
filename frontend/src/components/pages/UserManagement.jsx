import React, { useState, useEffect } from 'react';

const UserManagement = ({ onLogout, navigateToPage }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Administrator',
      status: 'Active',
      department: 'IT',
      lastLogin: '2024-02-20',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Manager',
      status: 'Active',
      department: 'Operations',
      lastLogin: '2024-02-19',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      role: 'User',
      status: 'Inactive',
      department: 'Finance',
      lastLogin: '2024-02-10',
      createdAt: '2024-02-01'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      role: 'Supervisor',
      status: 'Active',
      department: 'HR',
      lastLogin: '2024-02-21',
      createdAt: '2024-01-25'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
    department: ''
  });

  const roles = ['Administrator', 'Manager', 'Supervisor', 'User'];
  const departments = ['IT', 'Operations', 'Finance', 'HR', 'Marketing', 'Sales'];
  const statuses = ['Active', 'Inactive'];

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status,
        department: editingUser.department
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'User',
        status: 'Active',
        department: ''
      });
    }
  }, [editingUser]);

  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleAddUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
    } else {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        lastLogin: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    
    setShowModal(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleNavigation = (page) => {
    navigateToPage(page);
  };

  return (
    <div className="user-management">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>LCCAP</h2>
          <p>Environmental Management</p>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => handleNavigation('dashboard')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </div>
          <div className="nav-item" onClick={() => handleNavigation('accomplishment')}>
            <span className="nav-icon">📈</span>
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
          <div className="nav-item active" onClick={() => handleNavigation('user-management')}>
            <span className="nav-icon">👥</span>
            <span className="nav-text">User Management</span>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>User Management</h1>
          <button className="add-btn" onClick={handleAddUser}>
            <span className="add-icon">➕</span>
            Add User
          </button>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')} className="sortable">
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('email')} className="sortable">
                  Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('role')} className="sortable">
                  Role {sortBy === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('department')} className="sortable">
                  Department {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('status')} className="sortable">
                  Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th onClick={() => handleSort('lastLogin')} className="sortable">
                  Last Login {sortBy === 'lastLogin' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedUsers.map(user => (
                <tr key={user.id}>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td className="user-role">
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="user-department">{user.department}</td>
                  <td className="user-status">
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="user-last-login">{user.lastLogin}</td>
                  <td className="user-actions">
                    <button 
                      className="action-btn edit-btn"
                      onClick={() => handleEditUser(user)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="user-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    {editingUser ? 'Update User' : 'Create User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .user-management {
          display: flex;
          height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background: linear-gradient(180deg, #2d5016 0%, #4a7c59 100%);
          color: white;
          display: flex;
          flex-direction: column;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
          z-index: 999;
        }

        .sidebar-header {
          padding: 30px 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .sidebar-header h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
        }

        .sidebar-header p {
          margin: 5px 0 0;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 15px 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-left-color: rgba(255, 255, 255, 0.3);
        }

        .nav-item.active {
          background: rgba(255, 255, 255, 0.15);
          border-left-color: #ffffff;
        }

        .nav-icon {
          margin-right: 12px;
          font-size: 18px;
        }

        .nav-text {
          font-size: 14px;
          font-weight: 500;
        }

        .sidebar-footer {
          padding: 20px 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
          width: 100%;
          padding: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .logout-icon {
          margin-right: 8px;
        }

        /* Main Content Styles */
        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 30px;
          overflow-y: auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          color: #2d5016;
        }

        .add-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #4a7c59 0%, #2d5016 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(45, 80, 22, 0.4);
        }

        .add-icon {
          margin-right: 8px;
        }

        /* Filters */
        .filters {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 200px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .filter-group {
          min-width: 150px;
        }

        .filter-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        /* Table Styles */
        .user-table-container {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
        }

        .user-table th {
          background: #f8fafc;
          padding: 16px;
          text-align: left;
          font-weight: 600;
          color: #2d5016;
          border-bottom: 2px solid #e1e8ed;
        }

        .user-table th.sortable {
          cursor: pointer;
          user-select: none;
          transition: background 0.3s ease;
        }

        .user-table th.sortable:hover {
          background: #f1f5f9;
        }

        .user-table td {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .user-table tr:hover {
          background: #f8fafc;
        }

        .user-name {
          font-weight: 600;
          color: #1a202c;
        }

        .user-email {
          color: #64748b;
        }

        .role-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .role-badge.administrator {
          background: #fef3c7;
          color: #92400e;
        }

        .role-badge.manager {
          background: #dbeafe;
          color: #1e40af;
        }

        .role-badge.supervisor {
          background: #e0e7ff;
          color: #3730a3;
        }

        .role-badge.user {
          background: #f3f4f6;
          color: #374151;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }

        .status-badge.inactive {
          background: #fee2e2;
          color: #991b1b;
        }

        .user-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .edit-btn {
          background: #f3f4f6;
          color: #374151;
        }

        .edit-btn:hover {
          background: #e5e7eb;
        }

        .delete-btn {
          background: #fef2f2;
          color: #991b1b;
        }

        .delete-btn:hover {
          background: #fee2e2;
        }

        /* Modal Styles */
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
          z-index: 2000;
        }

        .user-modal {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #e1e8ed;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
          color: #1a202c;
        }

        .close-btn {
          width: 32px;
          height: 32px;
          border: none;
          background: #f3f4f6;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: #e5e7eb;
        }

        .user-form {
          padding: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #374151;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: #4a7c59;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.1);
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .cancel-btn {
          padding: 12px 24px;
          border: 2px solid #e1e8ed;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: #f8fafc;
        }

        .submit-btn {
          padding: 12px 24px;
          background: linear-gradient(135deg, #4a7c59 0%, #2d5016 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
            padding: 20px;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .filters {
            flex-direction: column;
          }

          .search-box {
            min-width: auto;
          }

          .user-table-container {
            overflow-x: auto;
          }

          .user-table {
            min-width: 600px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
