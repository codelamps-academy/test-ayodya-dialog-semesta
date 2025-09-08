import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface UserCreateData {
  name: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface UserUpdateData {
  name?: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
}

export interface AuthLoginData {
  username: string;
  password: string;
}
