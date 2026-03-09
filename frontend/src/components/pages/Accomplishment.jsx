import React, { useState } from 'react';

const Accomplishment = ({ onLogout, navigateToPage }) => {
  // Department/Office options
  const departmentOptions = [
    'City Mayor\'s Office (CMO)',
    'City Human Resource Management Office (CHRMO)',
    'City General Services Office (CGSO)',
    'City Building and Architecture Office (CBAO)',
    'City Planning, Development and Sustainability Office (CPDSO)',
    'City Disaster Risk Reduction and Management Office (CDRRMO)',
    'City Veterinary and Agriculture Office (CVAO)',
    'City Social Welfare and Development Office (CSWDO)',
    'City Health Services Office (CHSO)',
    'City Environment and Parks Management Office (CEPMO)',
    'City Engineering Office',
    'Bureau of Fire Protection (BFP)',
    'Benguet Electric Cooperative (BENECO)',
    'Department of Public Works and Highways (DPWH)',
    'Human Resource Management Office (HRMO)'
  ];

  // Classification options
  const classificationOptions = [
    'Adaptation','Mitigation'
  ];

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

  // State for stored reports
  const [storedReports, setStoredReports] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new report object
    const newReport = {
      id: Date.now(),
      eventTitle: formData.programsProjects || formData.accomplishment || 'Untitled Event',
      eventDate: formData.date || new Date().toLocaleDateString(),
      dateCreated: new Date().toLocaleDateString(),
      ...formData
    };
    
    console.log('Creating new report:', newReport);
    
    // Add to stored reports
    setStoredReports(prev => {
      const updated = [...prev, newReport];
      console.log('Updated stored reports:', updated);
      return updated;
    });
    
    // Show success message
    alert(`Accomplishment Report "${newReport.eventTitle}" has been saved successfully!`);
    
    // Reset form
    setFormData({
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
    
    console.log('New report saved:', newReport);
  };

  const handleExportExcel = (report) => {
    try {
      console.log('Exporting report:', report);
      
      // Create Excel content (simplified version - in production, this would call backend API)
      const excelData = [
        ['No.', 'Department/Office', 'Climate Change Driver', 'Result/Impact, Justification on Climate Change', 
         'Programs and Projects per Sector', 'Output Indicators', 'Classification', 'Target', 'Accomplishment',
         'Beneficiary (sector)', 'Area Covered', 'Estimated Project Cost (in thousand pesos)', 'Actual Disbursement', 'Source'],
        [1, report.department || '', report.climateChangeDriver || '', report.resultImpact || '', report.programsProjects || '',
         report.outputIndicators || '', report.classification || '', report.target || '', report.accomplishment || '',
         report.beneficiary || '', report.areaCovered || '', report.estimatedCost || '', report.actualDisbursement || '', report.source || '']
      ];

      // Create CSV content (simplified Excel export)
      const csvContent = excelData.map(row => {
        // Handle commas and quotes in data
        return row.map(cell => {
          if (cell === null || cell === undefined) return '';
          const cellStr = String(cell);
          // If cell contains comma or quote, wrap in quotes
          if (cellStr.includes(',') || cellStr.includes('"')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        }).join(',');
      }).join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      
      // Clean filename for download
      const cleanTitle = (report.eventTitle || 'report').replace(/[^\w\s-]/g, '').replace(/\s+/g, '_');
      link.setAttribute('download', `Accomplishment_${cleanTitle}.csv`);
      
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up URL
      URL.revokeObjectURL(url);
      
      console.log(`Successfully exported Excel for: ${report.eventTitle}`);
      alert(`Accomplishment Report "${report.eventTitle}" exported successfully!`);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Professional Header with Environment Theme */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-200 shadow-sm">
        <div className="px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Accomplishment Reports</h1>
                  <p className="text-gray-600 mt-1">Climate Change Action Plan Accomplishment Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Reports</p>
                <p className="text-lg font-semibold text-gray-800">{storedReports.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="space-y-8">
          {/* Professional Form Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">New Accomplishment Report</h2>
                  <p className="text-white/80 text-sm">Enter climate action accomplishment details</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Accomplishment Number
                  </label>
                  <input
                    type="text"
                    name="accomplishmentNumber"
                    value={formData.accomplishmentNumber}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter accomplishment number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department/Office
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="">Select Department/Office</option>
                    {departmentOptions.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Climate Change Driver
                  </label>
                  <input
                    type="text"
                    name="climateChangeDriver"
                    value={formData.climateChangeDriver}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter climate change driver"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Result/Impact, Justification on Climate Change
                  </label>
                  <textarea
                    name="resultImpact"
                    value={formData.resultImpact}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Describe result/impact and justification"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Programs and Projects per Sector
                  </label>
                  <input
                    type="text"
                    name="programsProjects"
                    value={formData.programsProjects}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter programs and projects"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Output Indicators
                  </label>
                  <input
                    type="text"
                    name="outputIndicators"
                    value={formData.outputIndicators}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter output indicators"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Classification
                  </label>
                  <select
                    name="classification"
                    value={formData.classification}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="">Select Classification</option>
                    {classificationOptions.map((classification, index) => (
                      <option key={index} value={classification}>
                        {classification}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Target
                  </label>
                  <input
                    type="text"
                    name="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter target"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3 xl:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Accomplishment
                  </label>
                  <textarea
                    name="accomplishment"
                    value={formData.accomplishment}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Describe accomplishment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Beneficiary (sector)
                  </label>
                  <input
                    type="text"
                    name="beneficiary"
                    value={formData.beneficiary}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter beneficiary sector"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Area Covered
                  </label>
                  <input
                    type="text"
                    name="areaCovered"
                    value={formData.areaCovered}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter area covered"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Project Cost (in thousand pesos)
                  </label>
                  <input
                    type="text"
                    name="estimatedCost"
                    value={formData.estimatedCost}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter estimated cost"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Actual Disbursement
                  </label>
                  <input
                    type="text"
                    name="actualDisbursement"
                    value={formData.actualDisbursement}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter actual disbursement"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Source
                  </label>
                  <input
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    placeholder="Enter source"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Submit Accomplishment Report
                </button>
              </div>
            </form>
          </div>

          {/* Professional Reports Store Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Accomplishment Reports Store</h2>
                    <p className="text-white/80 text-sm">View and export saved accomplishment reports</p>
                  </div>
                </div>
                <div className="text-white/80 text-sm">
                  {storedReports.length} {storedReports.length === 1 ? 'Report' : 'Reports'}
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Event Title (with Date)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {storedReports.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="text-lg font-medium text-gray-600 mb-1">No accomplishment reports saved yet</p>
                          <p className="text-sm text-gray-400">Submit the form above to create your first report</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    storedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-green-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{report.eventTitle}</div>
                            <div className="text-sm text-gray-500">{report.eventDate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.dateCreated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleExportExcel(report)}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export Report
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accomplishment;
