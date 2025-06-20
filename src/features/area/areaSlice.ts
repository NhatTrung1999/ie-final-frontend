import { createSlice } from '@reduxjs/toolkit';

interface IDataArea {
  id: number;
  name: string;
  path: string;
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
      data: [{ id: 1, name: 'CUTTING', path: 'NOSEW' }],
    },
    {
      id: 1,
      name: 'STITCHING',
      data: [{ id: 1, name: 'STITCHING', path: 'NOSEW' }],
    },
    {
      id: 2,
      name: 'ASSEMBLY',
      data: [{ id: 1, name: 'ASSEMBLY', path: 'NOSEW' }],
    },
    {
      id: 3,
      name: 'STOCKFITTING',
      data: [{ id: 1, name: 'STOCKFITTING', path: 'NOSEW' }],
    },
    { id: 4, name: 'NOSEW', data: [{ id: 1, name: 'NOSEW', path: 'NOSEW' }] },
  ],
};

const areaSlice = createSlice({
  name: 'area',
  initialState,
  reducers: {},
});

export default areaSlice.reducer;
