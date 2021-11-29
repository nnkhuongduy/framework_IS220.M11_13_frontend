import { Location } from 'src/models/location';
import { _99phantramApi } from 'src/slices/api';

export const locationApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    getProvinces: build.query<Location[], void>({
      query: () => '/location/provinces',
    }),
    getWardsFromProvince: build.query<Location[], string>({
      query: (provinceId) => `/location/wards/${provinceId}`,
    }),
    getBlocksFromWard: build.query<Location[], string>({
      query: (wardId) => `/location/blocks/${wardId}`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProvincesQuery,
  useGetBlocksFromWardQuery,
  useLazyGetBlocksFromWardQuery,
  useGetWardsFromProvinceQuery,
  useLazyGetWardsFromProvinceQuery,
} = locationApi;
