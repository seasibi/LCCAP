import React, { useState } from 'react';

const HumanSecurity = () => {
  const [projects, setProjects] = useState([
    { id: 1, office: 'City Health Office', projectName: 'Health Services Enhancement', accomplishment: 85, status: 'Ongoing', target: '10000 patients', actual: '8500 patients served', quarter: 'Q1 2026' },
    { id: 2, office: 'City Social Welfare Office', projectName: 'Livelihood Programs', accomplishment: 78, status: 'Ongoing', target: '500 beneficiaries', actual: '390 beneficiaries', quarter: 'Q1 2026' }
  ]);

  const [stats] = useState({ leadingOffice: 'City Health Office', overallAccomplishment: 82, totalDepartments: 2, totalProjects: 5 });
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
      case 'Ongoing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Human Security</h1>
        <p className="text-gray-600">Programs ensuring safety, health, and well-being of all residents</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-md p-6 border border-red-300">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-red-700 font-medium">Leading Office</p><p className="text-xl font-bold text-red-900 mt-1">{stats.leadingOffice}</p></div>
            <div className="bg-red-600 text-white p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-lg shadow-md p-6 border border-rose-300">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-rose-700 font-medium">Overall Accomplishment</p><p className="text-2xl font-bold text-rose-900">{stats.overallAccomplishment}%</p></div>
            <div className="bg-rose-600 text-white p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg shadow-md p-6 border border-pink-300">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-pink-700 font-medium">Total Departments</p><p className="text-2xl font-bold text-pink-900">{stats.totalDepartments}</p></div>
            <div className="bg-pink-600 text-white p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-6 border border-orange-300">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-orange-700 font-medium">Total Projects</p><p className="text-2xl font-bold text-orange-900">{stats.totalProjects}</p></div>
            <div className="bg-orange-600 text-white p-3 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Projects by Office</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Office</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accomplishment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.office}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.projectName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${project.accomplishment}%` }}></div>
                      </div>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${getAccomplishmentColor(project.accomplishment)}`}>
                        {project.accomplishment}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.target}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.actual}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleView(project)} className="text-blue-600 hover:text-blue-900">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button onClick={() => handleEdit(project)} className="text-green-600 hover:text-green-900">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals (simplified for brevity - same structure as other pages) */}
      {isViewModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-sm text-gray-500">Office</p><p className="font-medium">{selectedProject.office}</p></div>
              <div><p className="text-sm text-gray-500">Project Name</p><p className="font-medium">{selectedProject.projectName}</p></div>
              <div><p className="text-sm text-gray-500">Accomplishment</p><p className="font-medium">{selectedProject.accomplishment}%</p></div>
              <div><p className="text-sm text-gray-500">Status</p><span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</span></div>
              <div><p className="text-sm text-gray-500">Target</p><p className="font-medium">{selectedProject.target}</p></div>
              <div><p className="text-sm text-gray-500">Actual</p><p className="font-medium">{selectedProject.actual}</p></div>
              <div><p className="text-sm text-gray-500">Quarter</p><p className="font-medium">{selectedProject.quarter}</p></div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}

      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{isEditModalOpen ? 'Edit Project' : 'Add New Project'}</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Office</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"><option>City Health Office</option><option>City Social Welfare Office</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Accomplishment (%)</label><input type="number" min="0" max="100" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"><option>Ongoing</option><option>Completed</option><option>Pending</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Target</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Actual</label><input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Quarter</label><select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"><option>Q1 2026</option><option>Q2 2026</option><option>Q3 2026</option><option>Q4 2026</option></select></div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => {setIsAddModalOpen(false); setIsEditModalOpen(false);}} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">{isEditModalOpen ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanSecurity;
