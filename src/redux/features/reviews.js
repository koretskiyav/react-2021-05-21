import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS } from '../constants';
import { isLoaded, shouldLoad } from '../utils';

// Actions

export const addReview = createAction(
  // TODO: move to 'AddRestaurantReview reducer'
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
    condition: (id, { getState }) => shouldLoadReviewsSelector(getState(), { restaurantId: id }),
  }
);

// Reducers:

const Reviews = createEntityAdapter();

const initialState = {
  ...Reviews.getInitialState(),
  status: {},
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
    [loadReviews.fulfilled.type]: (state, action) => {
      state.status[action.meta.arg] = STATUS.fulfilled;
      Reviews.addMany(state, action);
    },
    [loadReviews.rejected.type]: (state, { meta, error }) => {
      state.status[meta.arg] = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { meta, payload }) => {
      // TODO: move to 'AddRestaurantReview reducer'
      const { text, rating } = payload.review;
      const { reviewId, userId } = meta;
      Reviews.addOne(state, { id: reviewId, userId, text, rating });
    },
  },
});

export default reducer;

// Selectors

const reviewsSelectors = Reviews.getSelectors((state) => state.reviews);

export const reviewsSelector = reviewsSelectors.selectEntities;
export const reviewsStatusSelector = (state, props) => state.reviews.status[props.restaurantId];

export const reviewsLoadedSelector = isLoaded(reviewsStatusSelector);
export const shouldLoadReviewsSelector = shouldLoad(reviewsStatusSelector);

export const reviewSelector = (state, { id }) =>
  reviewsSelectors.selectById(state, id);
