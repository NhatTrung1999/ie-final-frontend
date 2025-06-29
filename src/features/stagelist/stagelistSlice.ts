import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import stagelistApi from '../../services/api/stagelistApi';
import type { IFormPayload } from '../../types';

export interface IStageListData {
  id: number;
  date: string;
  season: string;
  stage: string;
  area: string;
  article: string;
  video_name: string;
  video_path: string;
  created_by: string;
  created_at: string;
}

interface IStageList {
  id: number;
  name: string;
  data: IStageListData[];
}

interface IStageListState {
  stagelist: IStageList[];
  isLoading: boolean;
  error: string | null;
  videoPath: string;
  activeItemId: number | null;
}

const initialState: IStageListState = {
  stagelist: [
    {
      id: 0,
      name: 'CUTTING',
      data: [],
    },
    {
      id: 1,
      name: 'STITCHING',
      data: [],
    },
    {
      id: 2,
      name: 'ASSEMBLY',
      data: [],
    },
    {
      id: 3,
      name: 'STOCKFITTING',
      data: [],
    },
    { id: 4, name: 'NOSEW', data: [] },
  ],
  isLoading: false,
  error: null,
  videoPath: '',
  activeItemId: null,
};

export const cancelUpload = createAsyncThunk(
  'stagelist/cancel-video',
  async () => {
    return null;
  }
);

export const uploadVideo = createAsyncThunk(
  'stagelist/upload-video',
  async (
    {
      payload,
      onProgress,
    }: { payload: IFormPayload; onProgress?: (progress: number) => void },
    { rejectWithValue }
  ) => {
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
      const { message, data } = await stagelistApi.uploadVideo(
        formData,
        signal,
        onProgress
      );
      // console.log(response);
      return { message, data };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return rejectWithValue('Upload canceled');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVideo = createAsyncThunk(
  'stagelist/get-video',
  async (_, { rejectWithValue }) => {
    try {
      const data = await stagelistApi.getVideo();
      return data;
    } catch (error) {
      return rejectWithValue('Error fetch video');
    }
  }
);

export const deleteVideo = createAsyncThunk(
  'stagelist/delete-video',
  async (id: number, { rejectWithValue }) => {
    try {
      await stagelistApi.deleteVideo(id);
      return id;
    } catch (error) {
      return rejectWithValue('Delete failed!');
    }
  }
);

const stagelistSlice = createSlice({
  name: 'stagelist',
  initialState,
  reducers: {
    setVideoPath: (state, action: PayloadAction<string>) => {
      state.videoPath = action.payload;
    },
    setActiveItemId: (state, action: PayloadAction<number | null>) => {
      state.activeItemId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        const payload = action.payload.data;
        payload.forEach((item: IStageListData) => {
          const stagelist = state.stagelist.find(
            (a) => a.name.toLowerCase() === item.area.toLowerCase()
          );
          if (stagelist) {
            if (!stagelist.data.some((existing) => existing.id === item.id)) {
              stagelist.data.push(item);
            }
          }
        });
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        const data = action.payload;

        data.forEach((item) => {
          const stagelist = state.stagelist.find(
            (a) => a.name.toLowerCase() === item.area.toLowerCase()
          );
          if (stagelist) {
            if (!stagelist.data.some((existing) => existing.id === item.id)) {
              stagelist.data.push(item);
            }
          }
        });
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(deleteVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.payload;
        state.stagelist.forEach((stagelist) => {
          stagelist.data = stagelist.data.filter(
            (item) => item.id !== deletedId
          );
        });
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setVideoPath, setActiveItemId } = stagelistSlice.actions;

export default stagelistSlice.reducer;
