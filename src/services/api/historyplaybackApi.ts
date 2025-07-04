import type { IHistoryPlayback } from '../../types';
import axiosConfig from '../axiosConfig';

const historyplaybackApi = {
  createHistoryPlayback: async (payload: IHistoryPlayback[]) => {
    const response = await axiosConfig.post('/history-playback', payload);
    return response.data;
  },
  getHistoryPlayback: async () => {
    const response = await axiosConfig.post('/history-playback');
    return response.data;
  },
};

export default historyplaybackApi;
