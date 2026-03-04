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

export default api;
