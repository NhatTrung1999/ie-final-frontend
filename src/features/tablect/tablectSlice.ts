import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
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

export const createTableCt = createAsyncThunk(
  'tablect/create-tablect',
  async (payload: ITablectData[], { rejectWithValue }) => {
    try {
      console.log(payload);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

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
    setUpdateTablect: (
      state,
      action: PayloadAction<{
        id_video: number;
        col_index: number;
        nva_time: number;
        va_time: number;
        is_update_all_cts?: boolean;
      }>
    ) => {
      const { id_video, col_index, nva_time, va_time, is_update_all_cts } =
        action.payload;
      const item = state.tablect.find((t) => t.id_video === id_video);
      if (item) {
        if (
          col_index !== undefined &&
          nva_time !== undefined &&
          va_time !== undefined
        ) {
          item.nva.cts[col_index] = nva_time;
          item.va.cts[col_index] = va_time;
        }

        if (is_update_all_cts) {
          const nva_ct1 = item.nva.cts[0];
          const va_ct1 = item.va.cts[0];
          for (let i = 1; i < item.nva.cts.length; i++) {
            item.nva.cts[i] = nva_ct1 + Math.floor(Math.random() * 3);
            item.va.cts[i] = va_ct1 + Math.floor(Math.random() * 3);
          }

          item.nva.average = Math.round(
            item.nva.cts.reduce((sum, val) => sum + val, 0) /
              item.nva.cts.length
          );
          item.va.average = Math.round(
            item.va.cts.reduce((sum, val) => sum + val, 0) / item.va.cts.length
          );
        }
      }
    },
    deleteTablect: (state, action: PayloadAction<number>) => {
      state.tablect = state.tablect.filter(
        (item) => item.id_video !== action.payload
      );
    },
  },
});

export const {
  setTablectData,
  setActiveColId,
  setUpdateTablect,
  deleteTablect,
} = tablectSlice.actions;

export default tablectSlice.reducer;
