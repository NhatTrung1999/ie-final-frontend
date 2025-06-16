import axiosConfig from '../axiosConfig';

export interface LoginCredentials {
  account: string;
  password: string;
  factory: string;
}

export interface AuthResponse {
  access_token: string;
  // refreshToken?: string;
  user: {
    id: number;
    name: string;
    account: string;
    factory: string;
    role: string;
    is_active: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
  };
}

interface RefreshTokenPayload {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
}

const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosConfig.post<AuthResponse>(
      '/auth/login',
      credentials
    );
    return response.data;
  },
  refreshAuthToken: async (
    payoad: RefreshTokenPayload
  ): Promise<RefreshTokenResponse> => {
    const response = await axiosConfig.post<RefreshTokenResponse>(
      '/auth/refresh-token',
      payoad
    );
    return response.data;
  },
  logout: async (): Promise<void> => {
    await axiosConfig.post<void>('/auth/logout');
  },
};

export default authApi;
