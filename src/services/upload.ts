import { _99phantramApi } from 'src/slices/api';

export const fileApi = _99phantramApi.injectEndpoints({
  endpoints: (build) => ({
    uploadThumbnail: build.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/file/thumbnail',
        body: formData,
      }),
    }),
    uploadImages: build.mutation<{ urls: string[] }, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: '/file/images',
        body: formData,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useUploadThumbnailMutation, useUploadImagesMutation } = fileApi;
