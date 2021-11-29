import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface GlobalState {
  showLayoutHeader: boolean;
}

const initialState: GlobalState = {
  showLayoutHeader: true,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleLayoutHeader: (state, { payload }: PayloadAction<boolean>) => {
      state.showLayoutHeader = payload;
    },
  },
});

export const { toggleLayoutHeader } = globalSlice.actions;

export const selectLayoutHeaderState = (state: RootState) =>
  state.global.showLayoutHeader;

export default globalSlice.reducer;
