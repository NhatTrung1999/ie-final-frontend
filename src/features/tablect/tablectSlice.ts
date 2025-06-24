import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ITablectData } from '../../types';

interface ITablectState {
  tablect: ITablectData[];
  isLoading: boolean;
  error: string | null;
}
const initialState: ITablectState = {
  tablect: [],
  isLoading: false,
  error: null,
};

export const tablectSlice = createSlice({
  name: 'tablect',
  initialState,
  reducers: {
    setTablectData: (state, action: PayloadAction<ITablectData>) => {
      state.tablect.push(action.payload);
    },
  },
});

export const { setTablectData } = tablectSlice.actions;

export default tablectSlice.reducer;
