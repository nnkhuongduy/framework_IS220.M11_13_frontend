import { configureStore } from '@reduxjs/toolkit';

import { _99phantramApi } from './api';
import authReducer from './auth';
import globalReducer from './global';
import categoryReducer from './category';
import locationReducer from './location';
import supplyReducer from './supply';

export const store = configureStore({
  reducer: {
    [_99phantramApi.reducerPath]: _99phantramApi.reducer,
    global: globalReducer,
    auth: authReducer,
    category: categoryReducer,
    location: locationReducer,
    supply: supplyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(_99phantramApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
