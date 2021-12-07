import { omitBy, isNil } from 'lodash';

import { _99phantramApi } from 'src/slices/api';
import { PostSupply, Supply, SupplyQueryParams } from 'src/models/supply';
import { SUPPLY_CONSTANTS } from 'src/constants/supply';

export const locationApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    createSupply: build.mutation<void, PostSupply>({
      query: (form) => ({
        url: '/supply',
        method: 'POST',
        body: form,
      }),
      invalidatesTags: [{ type: SUPPLY_CONSTANTS.SUPPLY_CACHE_ID, id: 'OWN' }],
    }),
    getSupplies: build.query<Supply[], SupplyQueryParams>({
      query: (params) => ({
        url: '/supply',
        params: omitBy(params, isNil),
      }),
      providesTags: [{ type: SUPPLY_CONSTANTS.SUPPLY_CACHE_ID, id: 'ALL' }],
    }),
    getSupply: build.query<Supply, string>({
      query: (id) => `/supply/${id}`,
      providesTags: (result, error, id) => [
        { type: SUPPLY_CONSTANTS.SUPPLY_CACHE_ID, id },
      ],
    }),
    getOwnSupplies: build.query<Supply[], void>({
      query: () => '/supply/management',
      providesTags: [{ type: SUPPLY_CONSTANTS.SUPPLY_CACHE_ID, id: 'OWN' }],
    })
  }),
  overrideExisting: true,
});

export const {
  useCreateSupplyMutation,
  useGetSuppliesQuery,
  useGetSupplyQuery,
  useGetOwnSuppliesQuery,
  useLazyGetSuppliesQuery,
} = locationApi;
