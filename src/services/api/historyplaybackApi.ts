import type { IHistoryPlayback } from '../../types';
import axiosConfig from '../axiosConfig';

const historyplaybackApi = {
  createHistoryPlayback: async (payload: IHistoryPlayback[]) => {
    await axiosConfig.post('/history-playback', payload);
  },
  getHistoryPlayback: async () => {
    const response = await axiosConfig.get('/history-playback');
    return response.data;
  },
};

export default historyplaybackApi;
