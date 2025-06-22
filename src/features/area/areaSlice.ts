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
  },
});

export const { setAreaData } = areaSlice.actions;

export default areaSlice.reducer;
