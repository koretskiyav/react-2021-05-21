import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS } from '../constants';
import { arrToMap, isLoaded, shouldLoad } from '../utils';

export const LOAD_REVIEWS = 'LOAD_REVIEWS';

export const addReview = createAction(
  'reviews/add',
  (review, restaurantId) => ({
    payload: { review, restaurantId },
    meta: { generateId: ['reviewId', 'userId'] },
  })
);

export const loadReviews = createAsyncThunk(
  'reviews/load',
  (id) => api.loadReviews(id),
  {
    condition: (id, { getState }) =>
      shouldLoadReviewsSelector(getState(), { restaurantId: id }),
  }
);

const initialState = {
  status: {},
  entities: {},
  error: null,
};

const { reducer } = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: {
    [loadReviews.pending.type]: (state, { meta }) => {
      state.status[meta.arg] = STATUS.pending;
      state.error = null;
    },
    [loadReviews.fulfilled.type]: (state, { meta, payload }) => {
      state.status[meta.arg] = STATUS.fulfilled;
      Object.assign(state.entities, arrToMap(payload));
    },
    [loadReviews.rejected.type]: (state, { meta, error }) => {
      state.status[meta.arg] = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { meta, payload }) => {
      const { text, rating } = payload.review;
      const { reviewId, userId } = meta;
      state.entities[reviewId] = { id: reviewId, userId, text, rating };
    },
  },
});

export default reducer;

export const reviewsSelector = (state) => state.reviews.entities;
export const reviewsStatusSelector = (state, props) =>
  state.reviews.status[props.restaurantId];

export const reviewsLoadedSelector = isLoaded(reviewsStatusSelector);
export const shouldLoadReviewsSelector = shouldLoad(reviewsStatusSelector);

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
