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
  htmlFor?: string;
  onMouseDown?: (e: React.MouseEvent<T>) => void;
  onMouseMove?: (e: React.MouseEvent<T>) => void;
  onMouseUp?: (e: React.MouseEvent<T>) => void;
  onMouseLeave?: (e: React.MouseEvent<T>) => void;
  onClick?: () => void;
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

export interface IFormModal {
  date: string;
  season: string;
  stage: string;
  area: string;
  article: string;
  video: FileList;
}

export interface IFormPayload {
  date: string;
  season: string;
  stage: string;
  area: string;
  article: string;
  video: FileList;
  created_by: string;
  signal?: AbortSignal;
}
