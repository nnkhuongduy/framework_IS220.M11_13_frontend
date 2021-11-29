import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/models/user';
import { authApi } from 'src/services/auth';
import { RootState } from './store';

interface AuthState {
  identifier?: User;
  token?: string;
  authenticating: boolean;
}

const initialState: AuthState = {
  identifier: undefined,
  token: undefined,
  authenticating: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJwtToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    setAuthenticating: (state, { payload }: PayloadAction<boolean>) => {
      state.authenticating = payload;
    },
    logout: (state) => {
      state.token = undefined;
      state.identifier = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      state.authenticating = true;
    });
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.identifier = payload.identifier;
        state.token = payload.token;
        state.authenticating = false;
      }
    );
    builder.addMatcher(authApi.endpoints.authenticate.matchPending, (state) => {
      state.authenticating = true;
    });
    builder.addMatcher(
      authApi.endpoints.authenticate.matchFulfilled,
      (state, { payload }) => {
        state.identifier = payload;
        state.authenticating = false;
      }
    );
  },
});

export const { setJwtToken, logout, setAuthenticating } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.identifier;
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectAuthenticating = (state: RootState) =>
  state.auth.authenticating;

export default authSlice.reducer;
