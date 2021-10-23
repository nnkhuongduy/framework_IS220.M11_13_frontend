import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const _99phantramApi = createApi({
  reducerPath: '_99phantramApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
      const token = undefined;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
