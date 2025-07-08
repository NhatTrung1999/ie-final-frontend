import type { ISearch, IVideoResponse } from '../../types';
import axiosConfig from '../axiosConfig';

const stagelistApi = {
  uploadVideo: async (
    payload: FormData,
    onProgress?: (progress: number) => void,
    signal?: AbortSignal
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
        signal,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
  getVideo: async (payload: ISearch): Promise<IVideoResponse[]> => {
    const response = await axiosConfig.get('/video', { params: payload });
    return response.data.data;
  },
  deleteVideo: async (id: number): Promise<void> => {
    try {
      await axiosConfig.delete(`/video/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default stagelistApi;
