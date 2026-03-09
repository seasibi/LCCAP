import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { calendarEventsAPI } from '../../services/api';

const HumanSecurity = () => {
  const { showSuccess, showError, showInfo } = useToast();
  
  // State for events
  const [events, setEvents] = useState([]);
  
  // Calculate projects from events
  const calculateProjectsFromEvents = (eventsData) => {
    const humanSecurityEvents = eventsData.filter(event => 
      event.pillar && event.pillar.includes('Human Security')
    );
    
    // Group events by office to create projects
    const officeGroups = humanSecurityEvents.reduce((acc, event) => {
      const office = event.office || 'Unassigned';
      if (!acc[office]) {
        acc[office] = {
          id: Math.random(),
          office: office,
          projectName: `${office} Programs`,
          events: [],
          accomplishment: 0,
          status: 'Ongoing',
          target: 'Multiple activities',
          actual: '0 completed',
          quarter: 'Q1 2026'
        };
      }
      acc[office].events.push(event);
      return acc;
    }, {});

    // Calculate accomplishment for each office
    Object.values(officeGroups).forEach(project => {
      const totalEvents = project.events.length;
      const completedEvents = project.events.filter(event => event.status === 'Completed').length;
      project.accomplishment = totalEvents > 0 ? Math.round((completedEvents / totalEvents) * 100) : 0;
      project.actual = `${completedEvents}/${totalEvents} completed`;
      project.status = completedEvents === totalEvents ? 'Completed' : 'Ongoing';
    });

    return Object.values(officeGroups);
  };

  // Load events from API
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await calendarEventsAPI.getAll();
        setEvents(response.data);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([
          {
            id: 1,
            event_name: 'Health Services Enhancement',
            date: '2026-03-15',
            duration: '3 days',
            pillar: '4. Human Security',
            office: 'City Health Office',
            status: 'Completed'
          }
        ]);
      }
    };

    loadEvents();
  }, []);

  // Calculate projects from events
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const calculatedProjects = calculateProjectsFromEvents(events);
    setProjects(calculatedProjects);
  }, [events]);

  // Calculate stats from projects
  const stats = projects.length > 0 ? {
    leadingOffice: projects.reduce((prev, current) => 
      prev.accomplishment > current.accomplishment ? prev : current
    ).office,
    overallAccomplishment: Math.round(projects.reduce((sum, p) => sum + p.accomplishment, 0) / projects.length),
    totalDepartments: projects.length,
    totalProjects: events.filter(event => event.pillar && event.pillar.includes('Human Security')).length
  } : {
    leadingOffice: 'No data',
    overallAccomplishment: 0,
    totalDepartments: 0,
    totalProjects: 0
  };
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleAdd = () => setIsAddModalOpen(true);
  const handleEdit = (project) => { setSelectedProject(project); setIsEditModalOpen(true); };
  const handleView = (project) => { setSelectedProject(project); setIsViewModalOpen(true); };

  const getAccomplishmentColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': 
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'Planning':
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const MetricCard = ({ label, value, icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      gray: 'bg-gray-600'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
          <div className={`${colorClasses[color]} text-white p-3 rounded-xl`}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  const EmptyState = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
      <p className="text-gray-600">Start by adding your first project.</p>
    </div>
  );

  const GoalHeader = ({ title, subtitle }) => (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  );

  const FilterBar = ({ filters, setFilters, projects }) => {
    const [localFilters, setLocalFilters] = useState({
      office: '',
      status: '',
      searchTerm: ''
    });
    
    const filteredProjects = projects.filter(project => {
      const matchesOffice = !localFilters.office || project.office === localFilters.office;
      const matchesStatus = !localFilters.status || project.status === localFilters.status;
      const matchesSearch = !localFilters.searchTerm || 
        project.projectName.toLowerCase().includes(localFilters.searchTerm.toLowerCase()) ||
        project.office.toLowerCase().includes(localFilters.searchTerm.toLowerCase());
      
      return matchesOffice && matchesStatus && matchesSearch;
    });

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Office</label>
            <select
              value={localFilters.office}
              onChange={(e) => setLocalFilters({...localFilters, office: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Offices</option>
              {[...new Set(projects.map(p => p.office))].map(office => (
                <option key={office} value={office}>{office}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={localFilters.status}
              onChange={(e) => setLocalFilters({...localFilters, status: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Delayed">Delayed</option>
              <option value="Planning">Planning</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Projects</label>
            <input
              type="text"
              value={localFilters.searchTerm}
              onChange={(e) => setLocalFilters({...localFilters, searchTerm: e.target.value})}
              placeholder="Search by project name or office..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setLocalFilters({ office: '', status: '', searchTerm: '' })}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Clear Filters
            </button>
          </div>
        </div>
        {filteredProjects.length !== projects.length && (
          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        )}
        <ProjectsTable projects={filteredProjects} onView={handleView} onEdit={handleEdit} />
      </div>
    );
  };

  const ProjectsTable = ({ projects, onView, onEdit }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Office</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Project Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Accomplishment</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Target</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actual</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {projects.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12">
                  <EmptyState />
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={project.id} className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.office}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.projectName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.accomplishment}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${getAccomplishmentColor(project.accomplishment)}`}>
                        {project.accomplishment}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {project.actual}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onView(project)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onEdit(project)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title="Edit"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <GoalHeader 
        title="Human Security" 
        subtitle="Programs ensuring safety, health, and well-being of all residents"
      />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          label="Leading Office"
          value={stats.leadingOffice}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <MetricCard
          label="Overall Accomplishment"
          value={`${stats.overallAccomplishment}%`}
          color="green"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <MetricCard
          label="Total Departments"
          value={stats.totalDepartments}
          color="blue"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        <MetricCard
          label="Total Projects"
          value={stats.totalProjects}
          color="gray"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
      </div>

      {/* Projects Section Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Projects by Office</h2>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      {/* Filter Bar */}
      <FilterBar 
        filters={{}} 
        setFilters={() => {}} 
        projects={projects}
      />

      {/* View Modal */}
      {isViewModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Office</p>
                <p className="font-medium text-gray-900">{selectedProject.office}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Project Name</p>
                <p className="font-medium text-gray-900">{selectedProject.projectName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Accomplishment</p>
                <p className="font-medium text-gray-900">{selectedProject.accomplishment}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Target</p>
                <p className="font-medium text-gray-900">{selectedProject.target}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Actual</p>
                <p className="font-medium text-gray-900">{selectedProject.actual}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Quarter</p>
                <p className="font-medium text-gray-900">{selectedProject.quarter}</p>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {isEditModalOpen ? 'Edit Project' : 'Add New Project'}
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Office</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>City Health Office</option>
                    <option>City Social Welfare Office</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accomplishment (%)</label>
                  <input type="number" min="0" max="100" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Delayed</option>
                    <option>Planning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Actual</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quarter</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Q1 2026</option>
                    <option>Q2 2026</option>
                    <option>Q3 2026</option>
                    <option>Q4 2026</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {isEditModalOpen ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanSecurity;
