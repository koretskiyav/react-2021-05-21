import produce from 'immer';
import { ADD_REVIEW, FAILURE, LOAD_RESTAURANTS, REQUEST, STATUS, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, restaurantId, reviewId, data, error } = action;

  switch (type) {
    case LOAD_RESTAURANTS + REQUEST:
      return produce(state, (draft) => {
        draft.status = STATUS.pending;
        draft.error = null;
      });
    case LOAD_RESTAURANTS + SUCCESS:
      return produce(state, (draft) => {
        draft.status = STATUS.fulfilled;
        draft.entities = arrToMap(data);
      });
    case LOAD_RESTAURANTS + FAILURE:
      return produce(state, (draft) => {
        draft.status = STATUS.rejected;
        draft.error = error;
      });
    case ADD_REVIEW:
      return produce(state, (draft) => {
        draft.entities[restaurantId].reviews.push(reviewId);
      });
    default:
      return state;
  }
};
