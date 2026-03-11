import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Calendar Events API
export const calendarEventsAPI = {
  // Get all events
  getAll: () => api.get('/calendar/events/'),
  
  // Create new event
  create: (eventData) => api.post('/calendar/events/', eventData),
  
  // Update event
  update: (id, eventData) => api.put(`/calendar/events/${id}/`, eventData),
  
  // Delete event
  delete: (id) => api.delete(`/calendar/events/${id}/`),
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: () => api.get('/projects/'),
  
  // Get projects by pillar
  getByPillar: (pillar) => api.get(`/projects/pillar/${encodeURIComponent(pillar)}/`),
  
  // Create new project
  create: (projectData) => api.post('/projects/', projectData),
  
  // Update project
  update: (id, projectData) => api.put(`/projects/${id}/`, projectData),
  
  // Delete project
  delete: (id) => api.delete(`/projects/${id}/`),
};

export default api;
