import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

const axiosConfig = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || 'http://192.168.0.96:6868/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3600000,
});

// Request interceptor
axiosConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosConfig.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err: unknown) => {
    return Promise.reject(err);
  }
);

export default axiosConfig;
