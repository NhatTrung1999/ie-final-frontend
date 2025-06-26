import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IDataArea {
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

interface IArea {
  id: number;
  name: string;
  data: IDataArea[];
}

interface IAreaState {
  area: IArea[];
  videoPath: string;
  activeItemId: number | null;
}

const initialState: IAreaState = {
  area: [
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
  videoPath: '',
  activeItemId: null,
};

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {
    setAreaData: (state, action: PayloadAction<IDataArea[]>) => {
      const payload = action.payload;
      payload.forEach((item) => {
        const area = state.area.find(
          (a) => a.name.toLowerCase() === item.area.toLowerCase()
        );
        if (area) {
          if (!area.data.some((existing) => existing.id === item.id)) {
            area.data.push(item);
          }
        }
      });
    },
    setVideoPath: (state, action: PayloadAction<string>) => {
      state.videoPath = action.payload;
    },
    setActiveItemId: (state, action: PayloadAction<number | null>) => {
      state.activeItemId = action.payload;
    },
  },
});

export const { setAreaData, setVideoPath, setActiveItemId } = areaSlice.actions;

export default areaSlice.reducer;
