import { createSlice } from '@reduxjs/toolkit';
import { kebabCase } from 'lodash';

import { Supply, SupplyQueryParams } from 'src/models/supply';
import { supplyApi } from 'src/services/supply';
import { RootState } from './store';

interface SupplyState {
  supplies: Supply[];
  management: Supply[];
}

const initialState: SupplyState = {
  supplies: [],
  management: [],
};

const supplySlice = createSlice({
  name: 'supply',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      supplyApi.endpoints.getSupplies.matchFulfilled,
      (state, { payload }) => {
        state.supplies = [
          ...state.supplies.filter(
            (supply) => !payload.find((_) => (_._id || _.id) === supply.id)
          ),
          ...payload,
        ].map((_) => ({
          ..._,
          id: _._id || _.id,
          createdOn: _.createdAt || _.createdOn,
          modifiedOn: _.updatedAt || _.modifiedOn,
        }));
      }
    );
    builder.addMatcher(
      supplyApi.endpoints.getSupply.matchFulfilled,
      (state, { payload }) => {
        state.supplies = [
          ...state.supplies.filter(
            (supply) => !((payload._id || payload.id) === supply.id)
          ),
          {
            ...payload,
            id: payload._id || payload.id,
            createdOn: payload.createdAt || payload.createdOn,
            modifiedOn: payload.updatedAt || payload.modifiedOn,
          },
        ];
      }
    );
    builder.addMatcher(
      supplyApi.endpoints.getOwnSupplies.matchFulfilled,
      (state, { payload }) => {
        state.management = payload;
      }
    );
  },
});

export const selectSupplies = (state: RootState) => state.supply.supplies;
export const selectSupply = (id: string) => (state: RootState) =>
  state.supply.supplies.find((_) => _.id === id);
export const selectOwnSupplies = (state: RootState) => state.supply.management;
export const querySupplies =
  (query: Omit<SupplyQueryParams, 'page'>) => (state: RootState) =>
    state.supply.supplies.filter((_) => {
      let result = true;

      if (query.queryText)
        result = _.name.toLowerCase().includes(query.queryText.toLowerCase());

      if (query.categorySlug)
        result = Boolean(
          _.categories.find((category) =>
            category.slug.includes(kebabCase(query.categorySlug))
          )
        );

      return result;
    });

export default supplySlice.reducer;
