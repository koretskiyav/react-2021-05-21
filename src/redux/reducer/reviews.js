import {
  ADD_REVIEW,
  LOAD_REVIEWS,
  REQUEST,
  SUCCESS,
  FAILURE,
  STATUS,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  status: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, review, reviewId, userId, restaurantId, data, error } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      return {
        ...state,
        status: { ...state.status, [restaurantId]: STATUS.pending },
        error: null,
      };
    case LOAD_REVIEWS + SUCCESS:
      return {
        ...state,
        status: { ...state.status, [restaurantId]: STATUS.fulfilled },
        entities: { ...state.entities, ...arrToMap(data) },
      };
    case LOAD_REVIEWS + FAILURE:
      return {
        ...state,
        status: { ...state.status, [restaurantId]: STATUS.rejected },
        error,
      };
    case ADD_REVIEW:
      const { text, rating } = review;
      return {
        ...state,
        [reviewId]: { id: reviewId, userId, text, rating },
      };
    default:
      return state;
  }
};
