import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Proxy will handle pointing to localhost:3001
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  // Auth
  signup: (data: any) => api.post('/auth/signup', data),
  login: (data: any) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  
  // Analysis
  uploadResume: (formData: FormData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  analyzeResume: (data: any) => api.post('/analyze', data),
  getDemo: () => api.get('/demo'),
  
  // History
  getHistory: () => api.get('/history'),
  getAnalysis: (id: string) => api.get(`/history/${id}`),
  deleteAnalysis: (id: string) => api.delete(`/history/${id}`),
  
  // Settings
  deleteData: () => api.delete('/user/data'),
};
