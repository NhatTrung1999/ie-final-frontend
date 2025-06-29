import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IHistoryPlayback } from '../../types';

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
  },
});

export const { setHistoryPlayback, deleteHistoryPlayback } =
  historyPlaybackSlice.actions;

export default historyPlaybackSlice.reducer;
