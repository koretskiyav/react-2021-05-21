import { ADD_REVIEW, REQUEST, SUCCESS, FAILURE, STATUS, LOAD_REVIEWS } from '../constants';
import { arrToMap } from '../utils';
import produce from 'immer';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, review, reviewId, userId, data, error } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      return produce(state, (draft) => {
        draft.status = STATUS.pending;
        draft.error = null;
      });
    case LOAD_REVIEWS + SUCCESS:
      return produce(state, (draft) => {
        draft.status = STATUS.fulfilled;
        draft.entities = { ...draft.entities, ...arrToMap(data) };
      });
    case LOAD_REVIEWS + FAILURE:
      return produce(state, (draft) => {
        draft.status = STATUS.rejected;
        draft.error = error;
      });
    case ADD_REVIEW:
      const { text, rating } = review;
      return produce(state, (draft) => {
        draft.entities[reviewId] = { id: reviewId, userId, text, rating };
      });
    default:
      return state;
  }
};
