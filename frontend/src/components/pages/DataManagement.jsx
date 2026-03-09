import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';

const DataManagement = () => {
  const { showSuccess, showError, showInfo } = useToast();
  
  // State for data management
  const [activeTab, setActiveTab] = useState('pillars');
  const [pillars, setPillars] = useState([
    { id: 1, name: 'Food Security', description: 'Programs ensuring food availability and accessibility', color: 'green' },
    { id: 2, name: 'Water Sufficiency', description: 'Programs ensuring adequate water supply and management', color: 'blue' },
    { id: 3, name: 'Ecological and Environmental Stability', description: 'Programs protecting natural ecosystems', color: 'emerald' },
    { id: 4, name: 'Human Security', description: 'Programs ensuring safety and well-being of residents', color: 'red' },
    { id: 5, name: 'Climate-Smart Industries and Services', description: 'Programs promoting sustainable business practices', color: 'purple' },
    { id: 6, name: 'Sustainable Energy', description: 'Programs promoting renewable energy and efficiency', color: 'yellow' },
    { id: 7, name: 'Knowledge and Capacity Development', description: 'Programs enhancing climate literacy and capacity', color: 'teal' }
  ]);
  
  const [programs, setPrograms] = useState([
    { id: 1, name: 'Urban Garden Program', pillarId: 1, pillarName: 'Food Security', description: 'Community gardening initiatives' },
    { id: 2, name: 'Feeding Program', pillarId: 1, pillarName: 'Food Security', description: 'School and community feeding programs' },
    { id: 3, name: 'Nutrition Education', pillarId: 1, pillarName: 'Food Security', description: 'Nutrition awareness and education' },
    { id: 4, name: 'Water Supply Expansion', pillarId: 2, pillarName: 'Water Sufficiency', description: 'Expanding water distribution networks' },
    { id: 5, name: 'Water Treatment Plant Upgrade', pillarId: 2, pillarName: 'Water Sufficiency', description: 'Modernizing water treatment facilities' },
    { id: 6, name: 'Watershed Protection', pillarId: 2, pillarName: 'Water Sufficiency', description: 'Protecting water sources and watersheds' },
    { id: 7, name: 'Tree Planting Program', pillarId: 3, pillarName: 'Ecological Stability', description: 'Community tree planting activities' },
    { id: 8, name: 'Park Development', pillarId: 3, pillarName: 'Ecological Stability', description: 'Creating and maintaining public parks' },
    { id: 9, name: 'Health Services Enhancement', pillarId: 4, pillarName: 'Human Security', description: 'Improving healthcare access and quality' },
    { id: 10, name: 'Livelihood Programs', pillarId: 4, pillarName: 'Human Security', description: 'Skills training and livelihood support' },
    { id: 11, name: 'Green Business Certification', pillarId: 5, pillarName: 'Climate-Smart Industries', description: 'Certifying environmentally responsible businesses' },
    { id: 12, name: 'Industrial Zone Development', pillarId: 5, pillarName: 'Climate-Smart Industries', description: 'Developing eco-friendly industrial zones' },
    { id: 13, name: 'Solar Street Lighting', pillarId: 6, pillarName: 'Sustainable Energy', description: 'Installing solar-powered street lights' },
    { id: 14, name: 'Renewable Energy Program', pillarId: 6, pillarName: 'Sustainable Energy', description: 'Promoting renewable energy adoption' },
    { id: 15, name: 'Climate Change Training', pillarId: 7, pillarName: 'Knowledge Capacity', description: 'Training programs on climate change' },
    { id: 16, name: 'Capacity Building Program', pillarId: 7, pillarName: 'Knowledge Capacity', description: 'Building institutional capacity' }
  ]);
  
  const [offices, setOffices] = useState([
    { id: 1, name: 'City Mayor\'s Office (CMO)', code: 'CMO', type: 'Executive', color: 'purple' },
    { id: 2, name: 'City Human Resource Management Office (CHRMO)', code: 'CHRMO', type: 'Administrative', color: 'blue' },
    { id: 3, name: 'City General Services Office (CGSO)', code: 'CGSO', type: 'Administrative', color: 'indigo' },
    { id: 4, name: 'City Building and Architecture Office (CBAO)', code: 'CBAO', type: 'Technical', color: 'green' },
    { id: 5, name: 'City Planning, Development and Sustainability Office (CPDSO)', code: 'CPDSO', type: 'Technical', color: 'teal' },
    { id: 6, name: 'City Disaster Risk Reduction and Management Office (CDRRMO)', code: 'CDRRMO', type: 'Emergency', color: 'red' },
    { id: 7, name: 'City Veterinary and Agriculture Office (CVAO)', code: 'CVAO', type: 'Technical', color: 'emerald' },
    { id: 8, name: 'City Social Welfare and Development Office (CSWDO)', code: 'CSWDO', type: 'Social Services', color: 'pink' },
    { id: 9, name: 'City Health Services Office (CHSO)', code: 'CHSO', type: 'Health', color: 'rose' },
    { id: 10, name: 'City Environment and Parks Management Office (CEPMO)', code: 'CEPMO', type: 'Environmental', color: 'lime' },
    { id: 11, name: 'City Engineering Office', code: 'CEO', type: 'Technical', color: 'cyan' },
    { id: 12, name: 'Bureau of Fire Protection (BFP)', code: 'BFP', type: 'Emergency', color: 'orange' },
    { id: 13, name: 'Benguet Electric Cooperative (BENECO)', code: 'BENECO', type: 'Utility', color: 'yellow' },
    { id: 14, name: 'Department of Public Works and Highways (DPWH)', code: 'DPWH', type: 'Infrastructure', color: 'amber' },
    { id: 15, name: 'Human Resource Management Office (HRMO)', code: 'HRMO', type: 'Administrative', color: 'violet' }
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Handle add
  const handleAdd = () => {
    setFormData({});
    setIsAddModalOpen(true);
  };

  // Handle edit
  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setIsEditModalOpen(true);
  };

  // Handle delete
  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) {
      if (activeTab === 'pillars') {
        setPillars(pillars.filter(p => p.id !== item.id));
      } else if (activeTab === 'programs') {
        setPrograms(programs.filter(p => p.id !== item.id));
      } else if (activeTab === 'offices') {
        setOffices(offices.filter(o => o.id !== item.id));
      }
      showSuccess(`${activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)} deleted successfully`);
    }
  };

  // Handle save
  const handleSave = () => {
    if (activeTab === 'pillars') {
      if (isEditModalOpen) {
        setPillars(pillars.map(p => p.id === selectedItem.id ? formData : p));
      } else {
        setPillars([...pillars, { ...formData, id: Date.now() }]);
      }
    } else if (activeTab === 'programs') {
      if (isEditModalOpen) {
        setPrograms(programs.map(p => p.id === selectedItem.id ? formData : p));
      } else {
        setPrograms([...programs, { ...formData, id: Date.now() }]);
      }
    } else if (activeTab === 'offices') {
      if (isEditModalOpen) {
        setOffices(offices.map(o => o.id === selectedItem.id ? formData : o));
      } else {
        setOffices([...offices, { ...formData, id: Date.now() }]);
      }
    }
    
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    setFormData({});
    showSuccess(`${activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)} ${isEditModalOpen ? 'updated' : 'added'} successfully`);
  };

  const getColorClass = (color) => {
    const colorMap = {
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      teal: 'bg-teal-100 text-teal-800 border-teal-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      rose: 'bg-rose-100 text-rose-800 border-rose-200',
      lime: 'bg-lime-100 text-lime-800 border-lime-200',
      cyan: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      violet: 'bg-violet-100 text-violet-800 border-violet-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getOfficeColorDisplay = (office) => {
    // Create a two-color gradient display for offices
    const primaryColor = office.color;
    const secondaryColors = {
      purple: 'indigo',
      blue: 'cyan',
      indigo: 'purple',
      green: 'emerald',
      teal: 'cyan',
      red: 'orange',
      emerald: 'green',
      pink: 'rose',
      rose: 'pink',
      lime: 'green',
      cyan: 'blue',
      orange: 'red',
      yellow: 'amber',
      amber: 'yellow',
      violet: 'purple'
    };
    const secondaryColor = secondaryColors[primaryColor] || 'gray';
    
    return { primaryColor, secondaryColor };
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">Data Management</h1>
                  <p className="text-gray-600 mt-1">Manage pillars, programs, and offices for the LCCAP system</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-lg font-semibold text-gray-800">
                  {activeTab === 'pillars' ? pillars.length : activeTab === 'programs' ? programs.length : offices.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="space-y-8">
          {/* Professional Tab Navigation */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">System Data</h2>
                  <p className="text-white/80 text-sm">Manage LCCAP configuration data</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <nav className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                {['pillars', 'programs', 'offices'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-white text-green-700 shadow-md'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Professional Data Management Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {activeTab === 'pillars' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      )}
                      {activeTab === 'programs' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      )}
                      {activeTab === 'offices' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                    </h2>
                    <p className="text-white/80 text-sm">
                      {activeTab === 'pillars' && 'Manage LCCAP pillar configurations'}
                      {activeTab === 'programs' && 'Manage program assignments and details'}
                      {activeTab === 'offices' && 'Manage office information and codes'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Professional Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {activeTab === 'pillars' && (
                        <>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Color</th>
                        </>
                      )}
                      {activeTab === 'programs' && (
                        <>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Program Name</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pillar</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                        </>
                      )}
                      {activeTab === 'offices' && (
                        <>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Office Name</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type Color</th>
                        </>
                      )}
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(activeTab === 'pillars' ? pillars : activeTab === 'programs' ? programs : offices).map((item) => (
                      <tr key={item.id} className="hover:bg-green-50/50 transition-colors">
                        {activeTab === 'pillars' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getColorClass(item.color)}`}>
                                {item.name}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getColorClass(item.color)}`}>
                                {item.color}
                              </span>
                            </td>
                          </>
                        )}
                        {activeTab === 'programs' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getColorClass(pillars.find(p => p.id === item.pillarId)?.color)}`}>
                                {item.pillarName}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                          </>
                        )}
                        {activeTab === 'offices' && (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                {item.code}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full bg-${item.color}-500`}></div>
                                <div className={`w-4 h-4 rounded-full bg-${getOfficeColorDisplay(item).secondaryColor}-500`}></div>
                                <span className="text-xs text-gray-600">{item.type}</span>
                              </div>
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="inline-flex items-center px-3 py-1.5 text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200"
                              title="Edit"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item)}
                              className="inline-flex items-center px-3 py-1.5 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200"
                              title="Delete"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto m-4 border border-green-100">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {activeTab === 'pillars' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      )}
                      {activeTab === 'programs' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      )}
                      {activeTab === 'offices' && (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      )}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {isEditModalOpen ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
                    </h3>
                    <p className="text-white/80 text-sm">{isEditModalOpen ? 'Update existing information' : 'Create new entry'}</p>
                  </div>
                </div>
                <button 
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 text-white backdrop-blur-sm" 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedItem(null);
                    setFormData({});
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <form className="p-6 space-y-6">
              {activeTab === 'pillars' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-vertical"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                    <select
                      value={formData.color || ''}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    >
                      <option value="">Select a color</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                      <option value="emerald">Emerald</option>
                      <option value="red">Red</option>
                      <option value="purple">Purple</option>
                      <option value="yellow">Yellow</option>
                      <option value="teal">Teal</option>
                    </select>
                  </div>
                </>
              )}
              {activeTab === 'programs' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Program Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Pillar</label>
                    <select
                      value={formData.pillarId || ''}
                      onChange={(e) => {
                        const pillar = pillars.find(p => p.id === parseInt(e.target.value));
                        setFormData({
                          ...formData, 
                          pillarId: parseInt(e.target.value),
                          pillarName: pillar ? pillar.name : ''
                        });
                      }}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    >
                      <option value="">Select a pillar</option>
                      {pillars.map(pillar => (
                        <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-vertical"
                      rows={3}
                    />
                  </div>
                </>
              )}
              {activeTab === 'offices' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Office Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Code</label>
                    <input
                      type="text"
                      value={formData.code || ''}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    >
                      <option value="">Select a type</option>
                      <option value="Executive">Executive</option>
                      <option value="Administrative">Administrative</option>
                      <option value="Technical">Technical</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Social Services">Social Services</option>
                      <option value="Health">Health</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Utility">Utility</option>
                      <option value="Infrastructure">Infrastructure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Color</label>
                    <select
                      value={formData.color || ''}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full h-10 px-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    >
                      <option value="">Select a color</option>
                      <option value="purple">Purple</option>
                      <option value="blue">Blue</option>
                      <option value="indigo">Indigo</option>
                      <option value="green">Green</option>
                      <option value="teal">Teal</option>
                      <option value="red">Red</option>
                      <option value="emerald">Emerald</option>
                      <option value="pink">Pink</option>
                      <option value="rose">Rose</option>
                      <option value="lime">Lime</option>
                      <option value="cyan">Cyan</option>
                      <option value="orange">Orange</option>
                      <option value="yellow">Yellow</option>
                      <option value="amber">Amber</option>
                      <option value="violet">Violet</option>
                    </select>
                  </div>
                </>
              )}
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedItem(null);
                    setFormData({});
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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

export default DataManagement;
