import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ORDER_CONSTANTS } from 'src/constants/order';
import { SUPPLY_CONSTANTS } from 'src/constants/supply';
import { RootState } from './store';

export const _99phantramApi = createApi({
  reducerPath: '_99phantramApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [ORDER_CONSTANTS.ORDER_CACHE_ID, SUPPLY_CONSTANTS.SUPPLY_CACHE_ID],
});
