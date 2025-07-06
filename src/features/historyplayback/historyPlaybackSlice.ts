import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { IHistoryPlayback } from '../../types';
import historyplaybackApi from '../../services/api/historyplaybackApi';

interface IHistoryPlaybackState {
  history_playback: IHistoryPlayback[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IHistoryPlaybackState = {
  history_playback: [],
  isLoading: false,
  error: null,
};

export const createHistoryPlayback = createAsyncThunk(
  'historyplayback/create',
  async (payload: IHistoryPlayback[], { rejectWithValue }) => {
    try {
      await historyplaybackApi.createHistoryPlayback(payload);
      // console.log(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getHistoryPlayback = createAsyncThunk(
  'historyplayback/get-historyplayback',
  async (_, { rejectWithValue }) => {
    try {
      const data = await historyplaybackApi.getHistoryPlayback();
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const historyPlaybackSlice = createSlice({
  name: 'historyPlayback',
  initialState,
  reducers: {
    setHistoryPlayback: (state, action: PayloadAction<IHistoryPlayback>) => {
      state.history_playback.unshift(action.payload);
    },
    deleteHistoryPlayback: (state, action: PayloadAction<string>) => {
      state.history_playback = state.history_playback.filter(
        (item) => item.id_historyplayback !== action.payload
      );
    },
    deleteAllHistoryPlayback: (state, action: PayloadAction<number>) => {
      state.history_playback = state.history_playback.filter(
        (item) => item.id_tablect !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryPlayback.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getHistoryPlayback.fulfilled, (state, action) => {
        state.history_playback = action.payload;
      })
      .addCase(getHistoryPlayback.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setHistoryPlayback,
  deleteHistoryPlayback,
  deleteAllHistoryPlayback,
} = historyPlaybackSlice.actions;

export default historyPlaybackSlice.reducer;
