import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5173';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if you implement authentication later
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// NASA API calls
export const nasaAPI = {
  getClimateData: (data) => api.post('/nasa/climate-data', data),
  getMultiDataset: (data) => api.post('/nasa/multi-dataset', data),
  getGibsImagery: (data) => api.post('/nasa/gibs/imagery', data),
  getGibsLayers: () => api.get('/nasa/gibs/layers'),
  getEonetEvents: (params) => api.get('/nasa/eonet/events', { params }),
  getEonetCategories: () => api.get('/nasa/eonet/categories'),
  getEosdisData: (params) => api.get('/nasa/eosdis/data', { params }),
};

// Predictions API calls
export const predictionsAPI = {
  generatePredictions: (data) => api.post('/predictions/generate', data),
  getAgriculturalRecommendations: (data) => api.post('/predictions/agricultural-recommendations', data),
  getRiskAssessment: (data) => api.post('/predictions/risk-assessment', data),
  getClimateSummary: (data) => api.post('/predictions/climate-summary', data),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;