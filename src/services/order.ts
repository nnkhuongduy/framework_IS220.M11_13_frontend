import { Order, PostOrderBody, PutOrderBody } from 'src/models/order';
import { ORDER_CONSTANTS } from 'src/constants/order';
import { _99phantramApi } from '../slices/api';
import { SUPPLY_CONSTANTS } from 'src/constants/supply';

export const orderApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<Order[], PostOrderBody>({
      query: (body) => ({
        url: '/order/create',
        method: 'POST',
        body,
      }),
    }),
    getOrder: build.query<Order, string>({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, id) => [
        { type: ORDER_CONSTANTS.ORDER_CACHE_ID, id },
      ],
    }),
    paidOrder: build.mutation<Order, { body: PutOrderBody; id: string }>({
      query: ({ body, id }) => ({
        url: `/order/paid/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [ORDER_CONSTANTS.ORDER_CACHE_ID],
    }),
    confirmOrder: build.mutation<Order, { body: PutOrderBody; id: string }>({
      query: ({ body, id }) => ({
        url: `/order/confirm/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [
        ORDER_CONSTANTS.ORDER_CACHE_ID,
        { type: SUPPLY_CONSTANTS.SUPPLY_CACHE_ID, id: 'OWN' },
      ],
    }),
    receivedOrder: build.mutation<Order, { body: PutOrderBody; id: string }>({
      query: ({ body, id }) => ({
        url: `/order/received/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [ORDER_CONSTANTS.ORDER_CACHE_ID],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  usePaidOrderMutation,
  useConfirmOrderMutation,
  useReceivedOrderMutation,
} = orderApi;
