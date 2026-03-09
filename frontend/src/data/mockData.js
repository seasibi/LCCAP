// Mock data for LCCAP Dashboard
export const statsData = {
  totalEvents: 156,
  completedEvents: 89,
  activeOffices: 12,
  ongoingEvents: 67
};

export const upcomingEvents = [
  {
    id: 1,
    date: '2024-03-15',
    title: 'Tree Planting Activity',
    office: 'Environment Office',
    location: 'Burnham Park'
  },
  {
    id: 2,
    date: '2024-03-18',
    title: 'Climate Action Workshop',
    office: 'Planning Office',
    location: 'City Hall'
  },
  {
    id: 3,
    date: '2024-03-22',
    title: 'River Clean-up Drive',
    office: 'Parks Management',
    location: 'Benguet River'
  },
  {
    id: 4,
    date: '2024-03-25',
    title: 'Environmental Awareness Seminar',
    office: 'Education Office',
    location: 'Convention Center'
  },
  {
    id: 5,
    date: '2024-03-28',
    title: 'Waste Management Audit',
    office: 'Sanitation Office',
    location: 'Public Market'
  }
];

export const recentActivities = [
  {
    id: 1,
    type: 'event',
    title: 'New event created: "Community Garden Setup"',
    timestamp: '2 hours ago',
    user: 'Admin User'
  },
  {
    id: 2,
    type: 'report',
    title: 'Quarterly Climate Report submitted',
    timestamp: '5 hours ago',
    user: 'Planning Office'
  },
  {
    id: 3,
    type: 'office',
    title: 'New office added: "Renewable Energy Division"',
    timestamp: '1 day ago',
    user: 'System Admin'
  },
  {
    id: 4,
    type: 'event',
    title: 'Event completed: "Coastal Clean-up Drive"',
    timestamp: '2 days ago',
    user: 'Environment Office'
  },
  {
    id: 5,
    type: 'report',
    title: 'Carbon footprint analysis updated',
    timestamp: '3 days ago',
    user: 'Data Analytics Team'
  }
];

export const lccapPillars = [
  {
    name: 'Food Security',
    progress: 60,
    color: '#2E7D32'
  },
  {
    name: 'Water Sufficiency',
    progress: 70,
    color: '#1E88E5'
  },
  {
    name: 'Ecological Stability',
    progress: 50,
    color: '#66BB6A'
  },
  {
    name: 'Human Security',
    progress: 80,
    color: '#2E7D32'
  },
  {
    name: 'Climate-Smart Industries',
    progress: 45,
    color: '#1E88E5'
  },
  {
    name: 'Sustainable Energy',
    progress: 65,
    color: '#66BB6A'
  },
  {
    name: 'Knowledge & Capacity',
    progress: 75,
    color: '#2E7D32'
  }
];

export const calendarEvents = {
  '2024-03-15': ['Tree Planting Activity'],
  '2024-03-18': ['Climate Action Workshop'],
  '2024-03-22': ['River Clean-up Drive'],
  '2024-03-25': ['Environmental Awareness Seminar'],
  '2024-03-28': ['Waste Management Audit']
};

export const notifications = [
  {
    id: 1,
    type: 'info',
    title: 'System Update',
    message: 'Dashboard features have been updated',
    timestamp: '30 minutes ago',
    read: false
  },
  {
    id: 2,
    type: 'success',
    title: 'Event Completed',
    message: 'Tree planting activity successfully completed',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 3,
    type: 'warning',
    title: 'Report Due',
    message: 'Monthly climate action report is due tomorrow',
    timestamp: '1 day ago',
    read: true
  }
];

export const userProfile = {
  name: 'Juan Dela Cruz',
  role: 'Environmental Officer',
  avatar: null,
  email: 'juan.delacruz@baguio.gov.ph'
};
