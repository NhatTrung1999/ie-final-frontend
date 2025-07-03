import type { IVideoResponse } from '../../types';
import axiosConfig from '../axiosConfig';

const stagelistApi = {
  uploadVideo: async (
    payload: FormData,
    onProgress?: (progress: number) => void
  ) => {
    try {
      const response = await axiosConfig.post('/video/upload-video', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
  getVideo: async (): Promise<IVideoResponse[]> => {
    const response = await axiosConfig.get('/video');
    return response.data.data;
  },
  deleteVideo: async (id: number): Promise<void> => {
    try {
      await axiosConfig.delete(`/video/${id}`);
    } catch (error) {
      console.log(error);
    }
  },
};

export default stagelistApi;
