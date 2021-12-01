import { PostRatingBody, Rating } from 'src/models/rating';
import { _99phantramApi } from '../slices/api';

export const ratingApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    createRating: build.mutation<void, PostRatingBody>({
      query: (body) => ({
        url: '/rating/create',
        method: 'POST',
        body,
      }),
    }),
    getRating: build.query<Rating, string>({
      query: (id) => `/rating/${id}`,
    }),
  }),
  overrideExisting: true,
});

export const { useCreateRatingMutation, useGetRatingQuery } = ratingApi;
