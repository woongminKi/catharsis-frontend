// Common Types for Catharsis Frontend

export interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Consultation {
  _id: string;
  writerId: string;
  title: string;
  content?: string;
  password?: string;
  isSecret: boolean;
  status: 'PENDING' | 'ANSWERED';
  boardType: 'INQUIRY' | 'AUDITION' | 'REALTIME';
  viewCount?: number;
  comments?: Comment[];
  needPassword?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
  message?: string;
}

export interface ImageUploadResult {
  key: string;
  url: string;
}

export interface ImageListItem {
  key: string;
  url: string;
  size: number;
  lastModified: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}
