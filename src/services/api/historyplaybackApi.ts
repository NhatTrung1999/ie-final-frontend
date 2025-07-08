import type { IHistoryPlayback, ISearch } from '../../types';
import axiosConfig from '../axiosConfig';

const historyplaybackApi = {
  createHistoryPlayback: async (payload: IHistoryPlayback[]) => {
    await axiosConfig.post('/history-playback', payload);
  },
  getHistoryPlayback: async (payload: ISearch) => {
    const response = await axiosConfig.get('/history-playback', {
      params: payload,
    });
    return response.data;
  },
};

export default historyplaybackApi;
