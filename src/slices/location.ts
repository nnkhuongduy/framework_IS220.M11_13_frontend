import { createSlice } from '@reduxjs/toolkit';

import { locationApi } from 'src/services/location';
import { Location } from 'src/models/location';
import { RootState } from './store';

interface LocationState {
  provinces: Location[];
  wards: Record<string, Location[]>;
  blocks: Record<string, Location[]>;
}

const initialState: LocationState = {
  provinces: [],
  wards: {},
  blocks: {},
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      locationApi.endpoints.getProvinces.matchFulfilled,
      (state, { payload }) => {
        state.provinces = payload.map((location) => ({
          ...location,
          id: location._id || location.id,
        }));
      }
    );
    builder.addMatcher(
      locationApi.endpoints.getWardsFromProvince.matchFulfilled,
      (state, { payload, meta }) => {
        state.wards[meta.arg.originalArgs] = payload.map((ward) => ({
          ...ward,
          id: ward._id || ward.id,
        }));
      }
    );
    builder.addMatcher(
      locationApi.endpoints.getBlocksFromWard.matchFulfilled,
      (state, { payload, meta }) => {
        state.blocks[meta.arg.originalArgs] = payload.map((block) => ({
          ...block,
          id: block._id || block.id,
        }));
      }
    );
  },
});

export const selectProvinces = (state: RootState) => state.location.provinces;
export const selectWards = (provinceId: string) => (state: RootState) =>
  state.location.wards[provinceId] || [];
export const selectBlocks = (wardId: string) => (state: RootState) =>
  state.location.blocks[wardId] || [];

export default locationSlice.reducer;
