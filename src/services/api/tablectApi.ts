import type { ISearch, ITablectPayload } from '../../types';
import axiosConfig from '../axiosConfig';

const tablectApi = {
  confirmTablect: async (payload: ITablectPayload[]) => {
    await axiosConfig.post('/tablect', payload);
  },
  getTablect: async (payload: ISearch): Promise<ITablectPayload[]> => {
    const response = await axiosConfig.get('/tablect', {params: payload});
    return response.data.data;
  },
  deleteTablect: async (id: number) => {
    try {
      await axiosConfig.delete(`/tablect/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default tablectApi;
