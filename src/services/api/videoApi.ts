import axiosConfig from '../axiosConfig';

const videoApi = {
  uploadVideo: async (payload: FormData, signal?: AbortSignal) => {
    const response = await axiosConfig.post('/video/upload-video', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
      signal,
    });
    return response.data;
  },
};

export default videoApi;
