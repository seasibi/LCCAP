import React from 'react';

const ProjectFilters = ({ 
  filters, 
  setFilters, 
  projects, 
  filteredCount, 
  totalCount 
}) => {
  const uniqueOffices = [...new Set(projects.map(p => p.office))];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Office</label>
          <select
            value={filters.office}
            onChange={(e) => setFilters({...filters, office: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Offices</option>
            {uniqueOffices.map(office => (
              <option key={office} value={office}>{office}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Projects</label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
            placeholder="Search by project name or office..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={() => setFilters({ office: '', status: '', searchTerm: '' })}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
      {filteredCount !== totalCount && (
        <p className="text-sm text-gray-600 mt-2">
          Showing {filteredCount} of {totalCount} projects
        </p>
      )}
    </div>
  );
};

export default ProjectFilters;
