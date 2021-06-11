import produce from 'immer';
import {
  ADD_REVIEW,
  REQUEST,
  SUCCESS,
  FAILURE,
  LOAD_REVIEWS,
  STATUS,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: {},
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, review, reviewId, userId, restaurantId, data, error } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST: {
      draft.status[restaurantId] = STATUS.pending;
      draft.error = null;
      break;
    }
    case LOAD_REVIEWS + SUCCESS: {
      draft.status[restaurantId] = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(data));
      break;
    }
    case LOAD_REVIEWS + FAILURE: {
      draft.status[restaurantId] = STATUS.rejected;
      draft.error = error;
      break;
    }
    case ADD_REVIEW:
      const { text, rating } = review;
      draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      break;
    default:
      return draft;
  }
});
