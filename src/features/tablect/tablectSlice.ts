import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ITablectData } from '../../types';

interface ITablectState {
  data: ITablectData[];
  isLoading: boolean;
  error: string | null;
}
const initialState: ITablectState = {
  data: [],
  isLoading: false,
  error: null,
};

export const tablectSlice = createSlice({
  name: 'tablect',
  initialState,
  reducers: {
    setTablectData: (state, action: PayloadAction<ITablectData>) => {
      state.data.push(action.payload);
    },
  },
});

export const { setTablectData } = tablectSlice.actions;

export default tablectSlice.reducer;
