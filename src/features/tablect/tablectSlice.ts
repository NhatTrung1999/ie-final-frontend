import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ITablectData } from '../../types';

interface ITablectState {
  tablect: ITablectData[];
  isLoading: boolean;
  error: string | null;
  activeColId: string | null;
}
const initialState: ITablectState = {
  tablect: [],
  isLoading: false,
  error: null,
  activeColId: null,
};

export const tablectSlice = createSlice({
  name: 'tablect',
  initialState,
  reducers: {
    setTablectData: (state, action: PayloadAction<ITablectData>) => {
      state.tablect.push(action.payload);
    },
    setActiveColId: (state, action: PayloadAction<string | null>) => {
      state.activeColId = action.payload;
    },
  },
});

export const { setTablectData, setActiveColId } = tablectSlice.actions;

export default tablectSlice.reducer;
