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
    { id: 1, name: 'City Mayor\'s Office (CMO)', code: 'CMO', type: 'Executive' },
    { id: 2, name: 'City Human Resource Management Office (CHRMO)', code: 'CHRMO', type: 'Administrative' },
    { id: 3, name: 'City General Services Office (CGSO)', code: 'CGSO', type: 'Administrative' },
    { id: 4, name: 'City Building and Architecture Office (CBAO)', code: 'CBAO', type: 'Technical' },
    { id: 5, name: 'City Planning, Development and Sustainability Office (CPDSO)', code: 'CPDSO', type: 'Technical' },
    { id: 6, name: 'City Disaster Risk Reduction and Management Office (CDRRMO)', code: 'CDRRMO', type: 'Emergency' },
    { id: 7, name: 'City Veterinary and Agriculture Office (CVAO)', code: 'CVAO', type: 'Technical' },
    { id: 8, name: 'City Social Welfare and Development Office (CSWDO)', code: 'CSWDO', type: 'Social Services' },
    { id: 9, name: 'City Health Services Office (CHSO)', code: 'CHSO', type: 'Health' },
    { id: 10, name: 'City Environment and Parks Management Office (CEPMO)', code: 'CEPMO', type: 'Environmental' },
    { id: 11, name: 'City Engineering Office', code: 'CEO', type: 'Technical' },
    { id: 12, name: 'Bureau of Fire Protection (BFP)', code: 'BFP', type: 'Emergency' },
    { id: 13, name: 'Benguet Electric Cooperative (BENECO)', code: 'BENECO', type: 'Utility' },
    { id: 14, name: 'Department of Public Works and Highways (DPWH)', code: 'DPWH', type: 'Infrastructure' },
    { id: 15, name: 'Human Resource Management Office (HRMO)', code: 'HRMO', type: 'Administrative' }
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
      teal: 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Management</h1>
        <p className="text-gray-600">Manage pillars, programs, and offices for the LCCAP system</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['pillars', 'programs', 'offices'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Action Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
        </h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add {activeTab.slice(0, -1).charAt(0).toUpperCase() + activeTab.slice(1, -1)}
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {activeTab === 'pillars' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                  </>
                )}
                {activeTab === 'programs' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pillar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </>
                )}
                {activeTab === 'offices' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Office Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeTab === 'pillars' ? pillars : activeTab === 'programs' ? programs : offices).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {activeTab === 'pillars' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getColorClass(item.color)}`}>
                          {item.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getColorClass(item.color)}`}>
                          {item.color}
                        </span>
                      </td>
                    </>
                  )}
                  {activeTab === 'programs' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getColorClass(pillars.find(p => p.id === item.pillarId)?.color)}`}>
                          {item.pillarName}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                    </>
                  )}
                  {activeTab === 'offices' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {item.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {item.type}
                        </span>
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isEditModalOpen ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
            </h3>
            <form className="space-y-4">
              {activeTab === 'pillars' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <select
                      value={formData.color || ''}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pillar</label>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select a pillar</option>
                      {pillars.map(pillar => (
                        <option key={pillar.id} value={pillar.id}>{pillar.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows={3}
                    />
                  </div>
                </>
              )}
              {activeTab === 'offices' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Office Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                    <input
                      type="text"
                      value={formData.code || ''}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                </>
              )}
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedItem(null);
                    setFormData({});
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
