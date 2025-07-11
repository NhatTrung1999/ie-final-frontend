import axiosConfig from '../axiosConfig';

const videoApi = {
  uploadVideo: async (
    payload: FormData,
    signal?: AbortSignal,
    onProgress?: (progress: number) => void
  ) => {
    try {
      const response = await axiosConfig.post('/video/upload-video', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        signal,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress?.(percentCompleted);
          }
        },
      });
      // console.log(response);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};

export default videoApi;
