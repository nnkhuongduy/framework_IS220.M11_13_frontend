import { Category } from 'src/models/category';
import { _99phantramApi } from 'src/slices/api';

export const categoryApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    getPrimaryCategories: build.query<Category[], void>({
      query: () => '/category/primary',
    }),
    getSecondaryCategories: build.query<Category[], string>({
      query: (id) => `/category/secondary/${id}`,
    })
  }),
  overrideExisting: true,
});

export const { useGetPrimaryCategoriesQuery, useGetSecondaryCategoriesQuery } =
  categoryApi;
