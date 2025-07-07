import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { ITablectData, ITablectPayload } from '../../types';
import tablectApi from '../../services/api/tablectApi';

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
  async (payload: ITablectPayload[], { rejectWithValue }) => {
    try {
      await tablectApi.confirmTablect(payload);
      return 'add success';
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getTablect = createAsyncThunk(
  'tablect/get-tablect',
  async (_, { rejectWithValue }) => {
    try {
      const res = await tablectApi.getTablect();
      const data = res.map((item) => ({
        ...item,
        nva: JSON.parse(item.nva),
        va: JSON.parse(item.va),
      }));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTablect = createAsyncThunk(
  'tablect/delete-tablect',
  async (id: number, { rejectWithValue }) => {
    try {
      await tablectApi.deleteTablect(id);
    } catch (error) {
      return rejectWithValue(error || 'Delete error!');
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
          if (is_update_all_cts) {
            item.nva.cts[col_index] = nva_time;
            item.va.cts[col_index] = va_time;
          } else {
            item.nva.cts[col_index] = (item.nva.cts[col_index] || 0) + nva_time;
            item.va.cts[col_index] = (item.va.cts[col_index] || 0) + va_time;
          }
        }

        if (is_update_all_cts) {
          const nva_ct1 = nva_time;
          const va_ct1 = va_time;
          for (let i = 1; i < item.nva.cts.length; i++) {
            if (item.nva.cts[i] === 0) {
              item.nva.cts[i] = nva_ct1 + Math.floor(Math.random() * 3);
            }
            if (item.va.cts[i] === 0) {
              item.va.cts[i] = va_ct1 + Math.floor(Math.random() * 3);
            }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTablect.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTablect.fulfilled, (state, action) => {
        state.tablect = action.payload;
      })
      .addCase(getTablect.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setTablectData,
  setActiveColId,
  setUpdateTablect,
} = tablectSlice.actions;

export default tablectSlice.reducer;
