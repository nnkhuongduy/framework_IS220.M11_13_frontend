import { createSlice } from '@reduxjs/toolkit';
import { Category, CategoryLevel } from 'src/models/category';
import { categoryApi } from 'src/services/category';
import { RootState } from './store';

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      categoryApi.endpoints.getPrimaryCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = [
          ...state.categories.filter(
            (category) => !payload.find((_) => (_._id || _.id) === category.id)
          ),
          ...payload,
        ].map((_) => ({
          ..._,
          id: _._id || _.id,
        }));
      }
    );
    builder.addMatcher(
      categoryApi.endpoints.getSecondaryCategories.matchFulfilled,
      (state, { payload }) => {
        state.categories = [
          ...state.categories.filter(
            (category) => !payload.find((_) => (_._id || _.id) === category.id)
          ),
          ...payload,
        ].map((_) => ({
          ..._,
          id: _._id || _.id,
        }));
      }
    );
    builder.addMatcher(
      categoryApi.endpoints.getCategory.matchFulfilled,
      (state, { payload }) => {
        state.categories = [
          ...state.categories.filter(
            (category) => !((payload._id || payload.id) === category.id)
          ),
          {
            ...payload,
            id: payload._id || payload.id,
          },
        ];
      }
    );
  },
});

export const selectCategories = (state: RootState) => state.category.categories;
export const selectPrimaryCategories = (state: RootState) =>
  state.category.categories.filter(
    (_) => _.categoryLevel === CategoryLevel.PRIMARY
  );
export const selectSecondaryCategories =
  (idOrSlug: string) => (state: RootState) => {
    const category = state.category.categories.find(
      (_) => _.id === idOrSlug || _.slug === idOrSlug
    );
    const subIds = category ? category.subCategories || [] : [];

    return state.category.categories.filter((_) =>
      subIds.find((__: string | Category) =>
        typeof __ === 'string' ? __ === _.id : __.id === _.id
      )
    );
  };
export const selectCategory = (idOrSlug: string) => (state: RootState) =>
  state.category.categories.find(
    (_) => _.id === idOrSlug || _.slug === idOrSlug
  );

export default categorySlice.reducer;
