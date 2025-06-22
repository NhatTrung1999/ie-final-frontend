import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IFormPayload } from '../../types';
import videoApi from '../../services/api/videoApi';
import { setAreaData } from '../area/areaSlice';

interface IVideoState {
  isLoading: boolean;
  error: string | null;
  message: string;
}

const initialState: IVideoState = {
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

    formData.append('date', date.trim());
    formData.append('season', season.toUpperCase().trim());
    formData.append('stage', stage.trim());
    formData.append('area', area.trim());
    formData.append('article', article.toUpperCase().trim());
    formData.append('created_by', created_by.trim());

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

export const getVideo = createAsyncThunk(
  'video/getVideo',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const data = await videoApi.getVideo();
      dispatch(setAreaData(data));
      return 'Get successfull!';
    } catch (error: any) {
      return rejectWithValue(error.message || 'error');
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
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getVideo.rejected, (state, aciton) => {
        state.isLoading = false;
        state.error = aciton.payload as string;
      });
  },
});

export default videoSlice.reducer;
