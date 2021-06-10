import produce from 'immer';
import {
  ADD_REVIEW,
  FAILURE,
  LOAD_RESTAURANTS,
  REQUEST,
  STATUS,
  SUCCESS,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default produce((draft, action) => {
  const { type, restaurantId, reviewId, data, error } = action;

  switch (type) {
    case LOAD_RESTAURANTS + REQUEST:
      draft.status = STATUS.pending;
      draft.error = null;
      break;
    case LOAD_RESTAURANTS + SUCCESS:
      draft.status = STATUS.fulfilled;
      draft.entities = arrToMap(data);
      break;
    case LOAD_RESTAURANTS + FAILURE:
      draft.status = STATUS.rejected;
      draft.error = error;
      break;
    case ADD_REVIEW:
      draft.entities[restaurantId].reviews.push(reviewId);
      break;
    default:
      return draft;
  }
}, initialState);
