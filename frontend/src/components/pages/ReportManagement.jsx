import React from 'react';

const ReportManagement = ({ onLogout, navigateToPage }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Management</h1>
            <p className="text-gray-600">Manage and track your accomplishment reports</p>
          </div>

          {/* Empty State */}
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="text-lg text-gray-500 mb-4">No reports available.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;
