import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service
const api = {
  // Projects
  getProjects: async () => {
    const response = await apiClient.get('/portfolio/projects');
    return response.data;
  },

  getProject: async (id) => {
    const response = await apiClient.get(`/portfolio/projects/${id}`);
    return response.data;
  },

  // Skills
  getSkills: async () => {
    const response = await apiClient.get('/portfolio/skills');
    return response.data;
  },

  // Experience
  getExperience: async () => {
    const response = await apiClient.get('/portfolio/experience');
    return response.data;
  },

  // Contact
  getContact: async () => {
    const response = await apiClient.get('/portfolio/contact');
    return response.data;
  },

  // Analytics
  logPageView: async (path, userAgent = navigator.userAgent) => {
    try {
      await apiClient.post('/analytics/pageview', {
        path,
        userAgent,
      });
    } catch (error) {
      // Silent fail for analytics
      console.error('Analytics error:', error);
    }
  },
};

export default api;
