import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Consultation, ApiResponse, LoginCredentials, RegisterData, Comment } from '../types';

const API_BASE_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api`;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
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

interface ConsultationParams {
  page?: number;
  limit?: number;
  boardType?: 'INQUIRY' | 'AUDITION';
  searchType?: string;
  keyword?: string;
}

interface CommentData {
  content: string;
}

// Auth APIs
export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse> =>
    api.post('/auth/login', credentials),
  getMe: (): Promise<AxiosResponse> => api.get('/auth/me'),
  register: (data: RegisterData): Promise<AxiosResponse> => api.post('/auth/register', data),
  logout: (): Promise<AxiosResponse> => api.post('/auth/logout'),
};

// Consultation APIs
export const consultationAPI = {
  // Create new consultation
  create: (data: Partial<Consultation>): Promise<AxiosResponse<ApiResponse<Consultation>>> =>
    api.post('/consultations', data),

  // Get all consultations
  getAll: (params?: ConsultationParams): Promise<AxiosResponse<ApiResponse<Consultation[]>>> =>
    api.get('/consultations', { params }),

  // Get single consultation
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Consultation>>> =>
    api.get(`/consultations/${id}`),

  // Check password for secret post
  checkPassword: (
    id: string,
    password: string
  ): Promise<AxiosResponse<ApiResponse<Consultation>>> =>
    api.post(`/consultations/${id}/check-password`, { password }),

  // Update consultation
  update: (
    id: string,
    data: Partial<Consultation>
  ): Promise<AxiosResponse<ApiResponse<Consultation>>> => api.patch(`/consultations/${id}`, data),

  // Delete consultation (soft)
  delete: (id: string, password: string): Promise<AxiosResponse> =>
    api.delete(`/consultations/${id}`, { data: { password } }),

  // Get deleted consultations (admin)
  getDeleted: (params?: ConsultationParams): Promise<AxiosResponse<ApiResponse<Consultation[]>>> =>
    api.get('/consultations/deleted', { params }),

  // Restore deleted consultation (admin)
  restore: (id: string): Promise<AxiosResponse> => api.post(`/consultations/${id}/restore`),

  // Force delete consultation (admin)
  forceDelete: (id: string): Promise<AxiosResponse> => api.delete(`/consultations/${id}/force`),

  // Bulk restore (admin)
  bulkRestore: (ids: string[]): Promise<AxiosResponse> =>
    api.post('/consultations/bulk-restore', { ids }),

  // Bulk force delete (admin)
  bulkForceDelete: (ids: string[]): Promise<AxiosResponse> =>
    api.delete('/consultations/bulk-force', { data: { ids } }),
};

// Comment APIs
export const commentAPI = {
  // Get comments for a post
  getAll: (postId: string): Promise<AxiosResponse<ApiResponse<Comment[]>>> =>
    api.get(`/consultations/${postId}/comments`),

  // Create comment (admin)
  create: (postId: string, data: CommentData): Promise<AxiosResponse<ApiResponse<Comment>>> =>
    api.post(`/consultations/${postId}/comments`, data),

  // Update comment (admin)
  update: (id: string, data: CommentData): Promise<AxiosResponse<ApiResponse<Comment>>> =>
    api.patch(`/comments/${id}`, data),

  // Delete comment (admin)
  delete: (id: string): Promise<AxiosResponse> => api.delete(`/comments/${id}`),
};

// Passer (합격자 현황) APIs
interface PasserParams {
  page?: number;
  limit?: number;
}

export interface Passer {
  _id: string;
  title: string;
  thumbnailUrl: string;
  imageUrls: string[];
  viewCount: number;
  createdAt: string;
}

export const passerAPI = {
  // Get all passers
  getAll: (params?: PasserParams): Promise<AxiosResponse<ApiResponse<Passer[]>>> =>
    api.get('/passers', { params }),

  // Get single passer
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Passer>>> => api.get(`/passers/${id}`),
};

// Notice (공지사항) APIs
interface NoticeParams {
  page?: number;
  limit?: number;
}

export interface Notice {
  _id: string;
  title: string;
  content: string;
  thumbnailUrl?: string;
  viewCount: number;
  createdAt: string;
}

export const noticeAPI = {
  // Get all notices
  getAll: (params?: NoticeParams): Promise<AxiosResponse<ApiResponse<Notice[]>>> =>
    api.get('/notices', { params }),

  // Get single notice
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Notice>>> => api.get(`/notices/${id}`),
};

// Resource (입시자료실) APIs
interface ResourceParams {
  page?: number;
  limit?: number;
}

export interface Resource {
  _id: string;
  title: string;
  content: string;
  thumbnailUrl?: string;
  viewCount: number;
  createdAt: string;
}

export const resourceAPI = {
  // Get all resources
  getAll: (params?: ResourceParams): Promise<AxiosResponse<ApiResponse<Resource[]>>> =>
    api.get('/resources', { params }),

  // Get single resource
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Resource>>> => api.get(`/resources/${id}`),
};

// Gallery (포토갤러리) APIs
interface GalleryParams {
  page?: number;
  limit?: number;
}

export interface Gallery {
  _id: string;
  title: string;
  imageUrl: string;
  viewCount: number;
  createdAt: string;
}

export const galleryAPI = {
  // Get all galleries
  getAll: (params?: GalleryParams): Promise<AxiosResponse<ApiResponse<Gallery[]>>> =>
    api.get('/galleries', { params }),

  // Get single gallery
  getOne: (id: string): Promise<AxiosResponse<ApiResponse<Gallery>>> => api.get(`/galleries/${id}`),
};

// Content (홈페이지 콘텐츠) API
export interface HeroSection {
  imageUrl: string;
  subtitle: string;
  title: string;
  buttonText: string;
  buttonLink: string;
}

export interface SchoolPasser {
  _id?: string;
  thumbnailUrl: string;
  school: string;
  count: number;
  link: string;
  order: number;
}

export interface YoutubeVideo {
  _id?: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  link: string;
  order: number;
}

export interface Instructor {
  _id?: string;
  imageUrl: string;
  name: string;
  description: string;
  link: string;
  order: number;
}

export interface InstagramPost {
  _id?: string;
  imageUrl: string;
  title: string;
  link: string;
  order: number;
}

export interface HomeContent {
  heroSection: HeroSection;
  schoolPassers: SchoolPasser[];
  youtubeVideos: YoutubeVideo[];
  instructors: Instructor[];
  instagramPosts: InstagramPost[];
}

export const contentAPI = {
  // Get home page content
  getAll: (): Promise<AxiosResponse<ApiResponse<HomeContent>>> => api.get('/content'),
};

export default api;
