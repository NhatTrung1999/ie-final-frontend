import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ICtrlPanelState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  startTime: number;
  stopTime: number;
  lastElapsedTime: number;
  types: { [key in 'NVA' | 'VA' | 'SKIP']: number };
}

const initialState: ICtrlPanelState = {
  isPlaying: false,
  duration: 0,
  currentTime: 0,
  startTime: 0,
  stopTime: 0,
  lastElapsedTime: 0,
  types: {
    NVA: 0,
    VA: 0,
    SKIP: 0,
  },
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
      state.currentTime = Math.floor(action.payload);
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = Math.floor(action.payload);
    },
    setStopTime: (state, action: PayloadAction<number>) => {
      state.stopTime = Math.floor(action.payload);
    },
    setLastElapsedTime: (state, action: PayloadAction<number>) => {
      state.lastElapsedTime = Math.floor(action.payload);
    },
    setTypes: (
      state,
      action: PayloadAction<{ type: 'NVA' | 'VA' | 'SKIP'; time: number }>
    ) => {
      state.types[action.payload.type] += Math.floor(action.payload.time);
    },
  },
});

export const {
  setIsPlaying,
  setDuration,
  setCurrentTime,
  setStartTime,
  setStopTime,
  setLastElapsedTime,
  setTypes,
} = ctrlpanelSlice.actions;

export default ctrlpanelSlice.reducer;
