import type { ITablectPayload } from '../../types';
import axiosConfig from '../axiosConfig';

const tablectApi = {
  confirmTablect: async (payload: ITablectPayload[]) => {
    await axiosConfig.post('/tablect', payload);
  },
  getTablect: async (): Promise<ITablectPayload[]> => {
    const response = await axiosConfig.get('/tablect');
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
