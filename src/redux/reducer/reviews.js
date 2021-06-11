import produce from 'immer';
import {
  STATUS,
  ADD_REVIEW,
  LOAD_RESTAURANTS,
  SUCCESS,
  LOAD_REVIEWS,
  REQUEST,
  FAILURE,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  statuses: {},
  entities: {},
  error: null,
};

export default produce((draft, action) => {
  const { type, review, reviewId, userId, data, restaurantId, error } = action;

  switch (type) {
    case LOAD_RESTAURANTS + SUCCESS:
      draft.statuses = data.reduce(
        (accum, restaurant) => ({
          ...accum,
          [restaurant.id]: STATUS.idle,
        }),
        {}
      );
      break;
    case LOAD_REVIEWS + REQUEST:
      draft.statuses[restaurantId] = STATUS.pending;
      draft.error = null;
      break;
    case LOAD_REVIEWS + SUCCESS:
      draft.statuses[restaurantId] = STATUS.fulfilled;
      draft.entities = { ...draft.entities, ...arrToMap(data) };
      break;
    case LOAD_REVIEWS + FAILURE:
      draft.statuses[restaurantId] = STATUS.rejected;
      draft.error = error;
      break;
    case ADD_REVIEW:
      const { text, rating } = review;

      draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      break;
    default:
      return draft;
  }
}, initialState);
