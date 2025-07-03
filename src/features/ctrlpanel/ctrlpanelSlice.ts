import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ICtrlPanelState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  startTime: number;
  stopTime: number;
  lastElapsedTime: number;
  types: { [key in string]: number };
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
      state.currentTime = action.payload;
    },
    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload;
    },
    setStopTime: (state, action: PayloadAction<number>) => {
      state.stopTime = action.payload;
    },
    setLastElapsedTime: (state, action: PayloadAction<number>) => {
      state.lastElapsedTime = action.payload;
    },
    setTypes: (
      state,
      action: PayloadAction<{ type: string; time: number }>
    ) => {
      state.types[action.payload.type] += action.payload.time;
    },
    setDiffTypes: (
      state,
      action: PayloadAction<{ type: string; time: number }>
    ) => {
      state.types[action.payload.type] -= action.payload.time;
    },
    setResetTypes: (
      state,
      action: PayloadAction<{ NVA: number; VA: number; SKIP: number }>
    ) => {
      state.types = { ...action.payload };
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
  setDiffTypes,
  setResetTypes
} = ctrlpanelSlice.actions;

export default ctrlpanelSlice.reducer;
