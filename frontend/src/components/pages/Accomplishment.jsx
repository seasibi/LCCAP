import React, { useState } from 'react';

const Accomplishment = () => {
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
    <>
      <div className="p-6 h-full overflow-hidden">
        <div className="w-full h-full flex flex-col">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-green-800 mb-6">Accomplishment</h1>

          {/* Form Container */}
          <div className="flex-1 bg-white rounded-lg shadow-lg border border-gray-100 overflow-auto">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Accomplishment Number
                      </label>
                      <input
                        type="text"
                        name="accomplishmentNumber"
                        value={formData.accomplishmentNumber}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter accomplishment number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department/Office
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter department or office"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Climate Change Driver
                      </label>
                      <input
                        type="text"
                        name="climateChangeDriver"
                        value={formData.climateChangeDriver}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter climate change driver"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Result/Impact, Justification on Climate Change
                      </label>
                      <textarea
                        name="resultImpact"
                        value={formData.resultImpact}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe result/impact and justification"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Programs and Projects per Sector
                      </label>
                      <input
                        type="text"
                        name="programsProjects"
                        value={formData.programsProjects}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter programs and projects"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Output Indicators
                      </label>
                      <input
                        type="text"
                        name="outputIndicators"
                        value={formData.outputIndicators}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter output indicators"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Classification
                      </label>
                      <input
                        type="text"
                        name="classification"
                        value={formData.classification}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter classification"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Target
                      </label>
                      <input
                        type="text"
                        name="target"
                        value={formData.target}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter target"
                      />
                    </div>

                    <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Accomplishment
                      </label>
                      <textarea
                        name="accomplishment"
                        value={formData.accomplishment}
                        onChange={handleInputChange}
                        rows={2}
                        className="w-full px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Describe accomplishment"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Beneficiary (sector)
                      </label>
                      <input
                        type="text"
                        name="beneficiary"
                        value={formData.beneficiary}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter beneficiary sector"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Area Covered
                      </label>
                      <input
                        type="text"
                        name="areaCovered"
                        value={formData.areaCovered}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter area covered"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Project Cost (in thousand pesos)
                      </label>
                      <input
                        type="text"
                        name="estimatedCost"
                        value={formData.estimatedCost}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter estimated cost"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Actual Disbursement
                      </label>
                      <input
                        type="text"
                        name="actualDisbursement"
                        value={formData.actualDisbursement}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter actual disbursement"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Source
                      </label>
                      <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Enter source"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end p-6">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-700 text-white font-medium rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Submit Accomplishment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
  );
};

export default Accomplishment;
