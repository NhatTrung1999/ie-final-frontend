import type React from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

export interface ICommonProps<T = unknown> {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<T>;
  type?: 'submit' | 'reset' | 'button' | undefined;
  htmlFor?: string;
  onMouseDown?: (e: React.MouseEvent<T>) => void;
  onMouseMove?: (e: React.MouseEvent<T>) => void;
  onMouseUp?: (e: React.MouseEvent<T>) => void;
  onMouseLeave?: (e: React.MouseEvent<T>) => void;
}

export interface LoginPayload {
  account: string;
  password: string;
  factory: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: number;
    name: string;
    account: string;
    factory: string;
    role: number;
    is_active: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: number;
    name: string;
    account: string;
    factory: string;
    role: number;
    is_active: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
  } | null;
  loading: boolean;
  error: string | null;
}
