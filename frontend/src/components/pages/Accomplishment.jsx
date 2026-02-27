import React, { useState } from 'react';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';

const Accomplishment = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    accomplishmentNumber: '',
    department: '',
    climateChangeDriver: '',
    resultImpact: '',
    programsProjects: '',
    outputIndicators: '',
    classification: '',
    target: '',
    date: '',
    accomplishment: '',
    beneficiary: '',
    areaCovered: '',
    estimatedCost: '',
    actualDisbursement: '',
    source: ''
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <Header showSidebarToggle={true} onSidebarToggle={toggleSidebar} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onNavigate={() => {}}
          currentPage="accomplishment"
          isMobile={false}
          onClose={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Form Content */}
          <div className="flex-1 overflow-auto p-2">
            <div className="w-full h-full flex">
              <div className="flex-1">
                {/* Page Title */}
                <h1 className="text-4xl font-bold text-green-800 mb-4">Accomplishment</h1>

                {/* Form Container */}
                <div className="bg-green-50 border-2 border-blue-500 rounded-2xl shadow-lg p-4 w-full">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Accomplishment Number
                          </label>
                          <input
                            type="text"
                            name="accomplishmentNumber"
                            value={formData.accomplishmentNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter accomplishment number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Department/Office
                          </label>
                          <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter department or office"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Climate Change Driver
                          </label>
                          <input
                            type="text"
                            name="climateChangeDriver"
                            value={formData.climateChangeDriver}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter climate change driver"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Result/Impact, Justification on Climate Change
                          </label>
                          <textarea
                            name="resultImpact"
                            value={formData.resultImpact}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Describe result/impact and justification"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Programs and Projects per Sector
                          </label>
                          <input
                            type="text"
                            name="programsProjects"
                            value={formData.programsProjects}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter programs and projects"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Output Indicators
                          </label>
                          <input
                            type="text"
                            name="outputIndicators"
                            value={formData.outputIndicators}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter output indicators"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Classification
                          </label>
                          <input
                            type="text"
                            name="classification"
                            value={formData.classification}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter classification"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target
                          </label>
                          <input
                            type="text"
                            name="target"
                            value={formData.target}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter target"
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Accomplishment
                          </label>
                          <textarea
                            name="accomplishment"
                            value={formData.accomplishment}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Describe accomplishment"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Beneficiary (sector)
                          </label>
                          <input
                            type="text"
                            name="beneficiary"
                            value={formData.beneficiary}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter beneficiary sector"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Area Covered
                          </label>
                          <input
                            type="text"
                            name="areaCovered"
                            value={formData.areaCovered}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter area covered"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Project Cost (in thousand pesos)
                          </label>
                          <input
                            type="text"
                            name="estimatedCost"
                            value={formData.estimatedCost}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter estimated cost"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Actual Disbursement
                          </label>
                          <input
                            type="text"
                            name="actualDisbursement"
                            value={formData.actualDisbursement}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter actual disbursement"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Source
                          </label>
                          <input
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Enter source"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-8">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-green-700 text-white font-medium rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        Submit Accomplishment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Accomplishment;
