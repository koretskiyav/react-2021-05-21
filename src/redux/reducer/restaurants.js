import { createNextState } from '@reduxjs/toolkit';

import {
  LOAD_RESTAURANTS,
  STATUS,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, meta, data, error } = action;

  switch (type) {
    case LOAD_RESTAURANTS + REQUEST:
      return { ...state, status: STATUS.pending, error: null };
    case LOAD_RESTAURANTS + SUCCESS:
      return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    case LOAD_RESTAURANTS + FAILURE:
      return { ...state, status: STATUS.rejected, error };
    case addReview.type:
      return createNextState(state, (draft) => {
        draft.entities[payload.restaurantId].reviews.push(meta.reviewId);
      });
    default:
      return state;
  }
};
