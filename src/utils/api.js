import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      // Optionally redirect to login
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
};

// Consultation APIs
export const consultationAPI = {
  // Create new consultation
  create: (data) => api.post('/consultations', data),

  // Get all consultations
  getAll: (params) => api.get('/consultations', { params }),

  // Get single consultation
  getOne: (id) => api.get(`/consultations/${id}`),

  // Check password for secret post
  checkPassword: (id, password) =>
    api.post(`/consultations/${id}/check-password`, { password }),

  // Update consultation
  update: (id, data) => api.patch(`/consultations/${id}`, data),

  // Delete consultation (soft)
  delete: (id, password) =>
    api.delete(`/consultations/${id}`, { data: { password } }),

  // Get deleted consultations (admin)
  getDeleted: (params) => api.get('/consultations/deleted', { params }),

  // Restore deleted consultation (admin)
  restore: (id) => api.post(`/consultations/${id}/restore`),

  // Force delete consultation (admin)
  forceDelete: (id) => api.delete(`/consultations/${id}/force`),

  // Bulk restore (admin)
  bulkRestore: (ids) => api.post('/consultations/bulk-restore', { ids }),

  // Bulk force delete (admin)
  bulkForceDelete: (ids) =>
    api.delete('/consultations/bulk-force', { data: { ids } }),
};

// Comment APIs
export const commentAPI = {
  // Get comments for a post
  getAll: (postId) => api.get(`/consultations/${postId}/comments`),

  // Create comment (admin)
  create: (postId, data) => api.post(`/consultations/${postId}/comments`, data),

  // Update comment (admin)
  update: (id, data) => api.patch(`/comments/${id}`, data),

  // Delete comment (admin)
  delete: (id) => api.delete(`/comments/${id}`),
};

export default api;
