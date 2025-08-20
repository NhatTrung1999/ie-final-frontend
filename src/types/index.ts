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
  onClick?: (e: React.MouseEvent<T>) => void;
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
  factory: string;
  video: FileList;
  created_by: string;
  signal?: AbortSignal;
}

export interface IVideoResponse {
  id: number;
  date: string;
  season: string;
  stage: string;
  area: string;
  article: string;
  video_name: string;
  video_path: string;
  created_by: string;
  created_at: string;
}

export interface ITablectHeader {
  no: string;
  progressStagePartName: string;
  type: string;
  cts: number;
  average: string;
  machine_type: string;
  confirm: string;
  action: string;
}

export interface ITablectData {
  id_video: number;
  no: string;
  progress_stage_part_name: string;
  area: string;
  nva: {
    type: string;
    cts: number[];
    average: number;
  };
  va: {
    type: string;
    cts: number[];
    average: number;
  };
  is_save?: boolean;
  machine_type: string;
  confirm: string;
  video_path?: string;
}

export interface ITablectPayload {
  id_video: number;
  no: string;
  progress_stage_part_name: string;
  area: string;
  nva: string;
  va: string;
  confirm: string;
  machine_type: string;
  video_path?: string;
  is_save?: boolean;
  created_by?: string;
}

export interface IHistoryPlayback {
  id_historyplayback: string;
  id_tablect: number | null;
  start_time: number;
  end_time: number;
  type: string;
  created_by: string;
  created_at: string;
}

export interface ISearch {
  date_from?: string;
  date_to?: string;
  season?: string;
  stage?: string;
  area?: string;
  article?: string;
  account?: string;
}
