import { AuthRequest, AuthResponse, RegisterationForm, StepTwoForm } from 'src/models/auth';
import { User } from 'src/models/user';
import { _99phantramApi } from 'src/slices/api';

export const authApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<void, RegisterationForm>({
      query: (form) => ({
        url: '/auth/registration',
        method: 'POST',
        body: form,
      }),
    }),
    verify: build.query<void, string>({
      query: (id) => `/auth/verification/${id}`,
    }),
    login: build.mutation<AuthResponse, AuthRequest>({
      query: (form) => ({
        url: '/auth/login',
        method: 'POST',
        body: form,
      }),
    }),
    authenticate: build.query<User, void>({
      query: () => '/auth/authenticate',
    }),
    stepTwoUpdate: build.mutation<void, StepTwoForm>({
      query: (form) => ({
        url: '/auth/step-two',
        method: 'POST',
        body: form,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useVerifyQuery,
  useLoginMutation,
  useLazyAuthenticateQuery,
  useStepTwoUpdateMutation,
} = authApi;
