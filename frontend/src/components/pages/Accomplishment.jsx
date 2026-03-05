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
    <>
      <div className="p-6 h-full overflow-hidden">
        <div className="w-full h-full flex flex-col">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-green-800 mb-6">Accomplishment</h1>

          {/* Form Container */}
          <div className="flex-1 bg-green-50 rounded-lg shadow-lg border border-green-300 overflow-auto">
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
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      <select
                        name="classification"
                        value={formData.classification}
                        onChange={handleInputChange}
                        className="w-full h-9 px-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
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

          {/* Accomplishment Reports Store */}
          <div className="mt-8 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-green-50">
              <h2 className="text-2xl font-bold text-green-800">Accomplishment Reports Store</h2>
              <p className="text-gray-600 mt-1">View and export saved accomplishment reports</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event Title (with Date)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {storedReports.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p>No accomplishment reports saved yet.</p>
                          <p className="text-sm text-gray-400 mt-1">Submit the form above to create your first report.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    storedReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{report.eventTitle}</div>
                            <div className="text-sm text-gray-500">{report.eventDate}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.dateCreated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleExportExcel(report)}
                            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Accomplishment Report – {report.eventTitle} ({report.eventDate})
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
      </>
  );
};

export default Accomplishment;
