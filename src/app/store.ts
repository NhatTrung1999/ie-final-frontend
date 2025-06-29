import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tablectReducer from '../features/tablect/tablectSlice';
import ctrlpanelReducer from '../features/ctrlpanel/ctrlpanelSlice';
import historyPlaybackReducer from '../features/historyplayback/historyPlaybackSlice';
import stagelistReducer from '../features/stagelist/stagelistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tablect: tablectReducer,
    ctrlpanel: ctrlpanelReducer,
    historyPlayback: historyPlaybackReducer,
    stagelist: stagelistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
