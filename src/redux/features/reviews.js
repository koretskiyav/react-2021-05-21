import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import produce from 'immer';
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

export default produce((draft = initialState, action) => {
  const { type, payload, meta, error } = action;

  switch (type) {
    case loadReviews.pending.type: {
      draft.status[meta.arg] = STATUS.pending;
      draft.error = null;
      break;
    }
    case loadReviews.fulfilled.type: {
      draft.status[meta.arg] = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(payload));
      break;
    }
    case loadReviews.rejected.type: {
      draft.status[meta.arg] = STATUS.rejected;
      draft.error = error;
      break;
    }
    case addReview.type:
      const { text, rating } = payload.review;
      const { reviewId, userId } = meta;
      draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      break;
    default:
      return draft;
  }
});

export const reviewsSelector = (state) => state.reviews.entities;
export const reviewsStatusSelector = (state, props) =>
  state.reviews.status[props.restaurantId];

export const reviewsLoadedSelector = isLoaded(reviewsStatusSelector);
export const shouldLoadReviewsSelector = shouldLoad(reviewsStatusSelector);

export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
