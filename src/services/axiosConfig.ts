import axios, { type InternalAxiosRequestConfig } from 'axios';

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Biến để theo dõi trạng thái làm mới token và lưu trữ các yêu cầu đang chờ
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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

// Response interceptor để handle 401 và refresh token
axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi không phải 401 hoặc đã thử lại, hoặc không có response, thì trả về lỗi
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Đánh dấu yêu cầu gốc đã được thử lại
    originalRequest._retry = true;

    // Nếu đang trong quá trình làm mới token, thêm yêu cầu vào hàng đợi
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosConfig(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // Bắt đầu quá trình làm mới token
    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
        {
          refreshToken,
        }
      );

      const { accessToken } = res.data;
      localStorage.setItem('accessToken', accessToken);

      // Xử lý tất cả các yêu cầu đang chờ trong hàng đợi
      processQueue(null, accessToken);

      // Cập nhật token cho yêu cầu gốc và thử lại
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosConfig(originalRequest);
    } catch (refreshError) {
      // Xử lý tất cả các yêu cầu đang chờ bị lỗi
      processQueue(refreshError);
      localStorage.clear();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    } finally {
      // Đặt lại trạng thái làm mới token
      isRefreshing = false;
    }
  }
);

export default axiosConfig;
