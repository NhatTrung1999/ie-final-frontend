import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import videoReducer from '../features/video/videoSlice';
import areaReducer from '../features/area/areaSlice';
import tablectReducer from '../features/tablect/tablectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    area: areaReducer,
    tablect: tablectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
