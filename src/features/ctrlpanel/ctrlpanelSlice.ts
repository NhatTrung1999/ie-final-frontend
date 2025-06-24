import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type ReactPlayer from 'react-player';

interface ICtrlPanelState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  playRef: ReactPlayer | null;
}

const initialState: ICtrlPanelState = {
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  playRef: null,
};

const ctrlpanelSlice = createSlice({
  name: 'ctrlpanel',
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

export const { setIsPlaying, setDuration, setCurrentTime } =
  ctrlpanelSlice.actions;

export default ctrlpanelSlice.reducer;
