import { createSlice } from '@reduxjs/toolkit';
import type { ITablectResponse } from '../../types';

interface ITablectState {
  data: ITablectResponse[];
  isLoading: boolean;
  error: string | null;
}
const initialState: ITablectState = {
  data: [
    {
      id: 8,
      id_video: 31,
      no: 'C1',
      progress_stage_part_name: 'Mantra',
      type: 'nva',
      cts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      average: 0,
      confirm: '26324',
      created_at: '2025-06-21T17:00:00.000Z',
    },
    {
      id: 9,
      id_video: 31,
      no: 'C1',
      progress_stage_part_name: 'Mantra',
      type: 'va',
      cts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      average: 0,
      confirm: '26324',
      created_at: '2025-06-21T17:00:00.000Z',
    },
  ],
  isLoading: false,
  error: null,
};

export const tablectSlice = createSlice({
  name: 'tablect',
  initialState,
  reducers: {},
});

export default tablectSlice.reducer;
