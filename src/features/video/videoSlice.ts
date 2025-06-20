import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IFormPayload } from '../../types';
import videoApi from '../../services/api/videoApi';

interface IVideoState {
  isLoading: boolean;
  error: string | null;
  message: string;
  data: any;
}

const initialState: IVideoState = {
  data: null,
  isLoading: false,
  message: '',
  error: null,
};
export const cancelUpload = createAsyncThunk('video/cancel', async () => {
  return null;
});

export const uploadVideo = createAsyncThunk(
  'video/upload',
  async (payload: IFormPayload, { rejectWithValue }) => {
    const { date, season, stage, area, article, video, created_by, signal } =
      payload;
    const formData = new FormData();

    formData.append('date', date);
    formData.append('season', season);
    formData.append('stage', stage);
    formData.append('area', area);
    formData.append('article', article);
    formData.append('created_by', created_by);

    if (video) {
      for (let i = 0; i < video.length; i++) {
        formData.append('videos', video[i]);
      }
    }
    try {
      const response = await videoApi.uploadVideo(formData, signal);
      return response;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return rejectWithValue('Upload canceled');
      }
      return rejectWithValue(error.message);
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // console.log(state);
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        // console.log(state, action.payload);
        state.isLoading = false;
        state.message = action.payload?.message;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        // console.log(state, action.payload);
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default videoSlice.reducer;
