import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { ISearch, ITablectData, ITablectPayload } from '../../types';
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

export const confirmTableCt = createAsyncThunk(
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

export const saveTablect = createAsyncThunk(
  'tablect/save-tablect',
  async (payload: ITablectPayload, { rejectWithValue }) => {
    try {
      await tablectApi.saveTablect(payload);
      return 'save success';
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTablect = createAsyncThunk(
  'tablect/get-tablect',
  async (payload: ISearch, { rejectWithValue }) => {
    try {
      const res = await tablectApi.getTablect(payload);
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

// export const saveTablect = createAsyncThunk(
//   'tablect/save-tablect',
//   async (
//     payload: {
//       id_video: number;
//       col_index: number;
//       nva_time: number;
//       va_time: number;
//       is_update_all_cts?: boolean;
//     },
//     { dispatch, rejectWithValue }
//   ) => {
//     try {
//       await tablectApi.saveTablect(payload);
//       await dispatch(getTablect({}));
//     } catch (error) {
//       return rejectWithValue(error || 'Update error!');
//     }
//   }
// );

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
            item.nva.cts[col_index] = Number(nva_time.toFixed(2));
            item.va.cts[col_index] = Number(va_time.toFixed(2));
          } else {
            item.nva.cts[col_index] = Number(
              ((item.nva.cts[col_index] || 0) + nva_time).toFixed(2)
            );
            item.va.cts[col_index] = Number(
              ((item.va.cts[col_index] || 0) + va_time).toFixed(2)
            );
          }
        }

        if (is_update_all_cts) {
          const validNvaCts = item.nva.cts.filter((ct) => ct > 0);
          const validVaCts = item.va.cts.filter((ct) => ct > 0);

          const avgNvaCt =
            validNvaCts.reduce((sum, val) => sum + val, 0) / validNvaCts.length;
          const avgVaCt =
            validVaCts.reduce((sum, val) => sum + val, 0) / validVaCts.length;

          const sumNvaCtBefore = validNvaCts.reduce((sum, val) => sum + val, 0);
          const sumVaCtBefore = validVaCts.reduce((sum, val) => sum + val, 0);

          let sumNvaCtAfter = 0;
          let sumVaCtAfter = 0;

          for (let i = 0; i < item.nva.cts.length - 1; i++) {
            const randomOffset = Math.random() * 2 - 1;
            if (item.nva.cts[i] === 0) {
              item.nva.cts[i] = Number(
                (+avgNvaCt.toFixed(2) + randomOffset).toFixed(2)
              );
              sumNvaCtAfter += item.nva.cts[i];
            }
            if (item.va.cts[i] === 0) {
              item.va.cts[i] = Number(
                (+avgVaCt.toFixed(2) + randomOffset).toFixed(2)
              );
              sumVaCtAfter += item.va.cts[i];
            }
          }

          const lastNvaCt =
            +avgNvaCt.toFixed(2) * 10 - sumNvaCtBefore - sumNvaCtAfter;
          const lastVaCt =
            +avgVaCt.toFixed(2) * 10 - sumVaCtBefore - sumVaCtAfter;

          item.nva.cts[item.nva.cts.length - 1] = Number(lastNvaCt.toFixed(2));

          item.va.cts[item.va.cts.length - 1] = Number(lastVaCt.toFixed(2));

          const averageNvaCt =
            item.nva.cts.reduce((sum, val) => sum + val, 0) /
            item.nva.cts.length;

          const averageVaCt =
            item.va.cts.reduce((sum, val) => sum + val, 0) / item.va.cts.length;

          item.nva.average = Number(averageNvaCt.toFixed(2));
          item.va.average = Number(averageVaCt.toFixed(2));

          // console.log(item.nva.cts[item.nva.cts.length - 1]);

          // if (validNvaCts.length === 1 && validVaCts.length === 1) {
          //   for (let i = 1; i < item.nva.cts.length; i++) {
          //     if (item.nva.cts[i] === 0) {
          //       item.nva.cts[i] = nva_time + Math.floor(Math.random() * 3);
          //     }
          //     if (item.va.cts[i] === 0) {
          //       item.va.cts[i] = va_time + Math.floor(Math.random() * 3);
          //     }
          //   }
          // } else if (validNvaCts.length >= 2 && validVaCts.length >= 2) {
          //   const nvaDiffs = validNvaCts
          //     .slice(1)
          //     .map((ct, i) => Math.abs(ct - validNvaCts[i]));
          //   console.log('nvaDiffs: ', nvaDiffs);
          //   const vaDiffs = validVaCts
          //     .slice(1)
          //     .map((ct, i) => Math.abs(ct - validVaCts[i]));
          //   console.log('vaDiffs: ', vaDiffs);

          //   const nvaAvgDiff =
          //     nvaDiffs.reduce((sum, diff) => sum + diff, 0) / nvaDiffs.length;

          //   console.log('nvaAvgDiff: ', nvaAvgDiff);

          //   const vaAvgDiff =
          //     vaDiffs.reduce((sum, diff) => sum + diff, 0) / vaDiffs.length;

          //   console.log('vaAvgDiff: ', vaAvgDiff);

          //   const nvaMean =
          //     validNvaCts.reduce((sum, ct) => sum + ct, 0) / validNvaCts.length;

          //   console.log('nvaMean: ', nvaMean);

          //   const vaMean =
          //     validVaCts.reduce((sum, ct) => sum + ct, 0) / validVaCts.length;

          //   console.log('vaMean: ', vaMean);

          //   for (let i = 0; i < item.nva.cts.length; i++) {
          //     if (item.nva.cts[i] === 0) {
          //       item.nva.cts[i] =
          //         Math.ceil(nvaMean) +
          //         Math.round(Math.random() * Math.ceil(nvaAvgDiff));
          //     }
          //     if (item.va.cts[i] === 0) {
          //       item.va.cts[i] =
          //         Math.ceil(vaMean) +
          //         Math.round(Math.random() * Math.ceil(vaAvgDiff));
          //     }
          //   }
          // }

          // item.nva.average = Math.round(
          //   item.nva.cts.reduce((sum, val) => sum + val, 0) /
          //     item.nva.cts.length
          // );
          // item.va.average = Math.round(
          //   item.va.cts.reduce((sum, val) => sum + val, 0) / item.va.cts.length
          // );

          // const nva_ct1 = nva_time;
          // const va_ct1 = va_time;
          // for (let i = 1; i < item.nva.cts.length; i++) {
          //   if (item.nva.cts[i] === 0) {
          //     item.nva.cts[i] = nva_ct1 + Math.floor(Math.random() * 3);
          //   }
          //   if (item.va.cts[i] === 0) {
          //     item.va.cts[i] = va_ct1 + Math.floor(Math.random() * 3);
          //   }
          // }

          // item.nva.average = Math.round(
          //   item.nva.cts.reduce((sum, val) => sum + val, 0) /
          //     item.nva.cts.length
          // );
          // item.va.average = Math.round(
          //   item.va.cts.reduce((sum, val) => sum + val, 0) / item.va.cts.length
          // );
        }
      }
    },
    setUpdateTablectWithoutFormula: (
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
            item.nva.cts[col_index] = Number(nva_time.toFixed(2));
            item.va.cts[col_index] = Number(va_time.toFixed(2));
          } else {
            item.nva.cts[col_index] = Number(
              ((item.nva.cts[col_index] || 0) + nva_time).toFixed(2)
            );
            item.va.cts[col_index] = Number(
              ((item.va.cts[col_index] || 0) + va_time).toFixed(2)
            );
          }
        }

        if (is_update_all_cts) {
          const validNvaCts = item.nva.cts.filter((ct) => ct > 0);
          const validVaCts = item.va.cts.filter((ct) => ct > 0);

          const avgNvaCt =
            validNvaCts.reduce((sum, val) => sum + val, 0) / validNvaCts.length;
          const avgVaCt =
            validVaCts.reduce((sum, val) => sum + val, 0) / validVaCts.length;

          item.nva.average = +avgNvaCt.toFixed(2);
          item.va.average = +avgVaCt.toFixed(2);
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
  setUpdateTablectWithoutFormula,
} = tablectSlice.actions;

export default tablectSlice.reducer;
