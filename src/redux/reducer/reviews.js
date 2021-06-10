import { ADD_REVIEW, FAILURE, LOAD_REVIEWS, REQUEST, STATUS, SUCCESS } from '../constants';
import { arrToMap } from '../utils';
import produce from 'immer';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, review, reviewId, userId, data, error } = action;

  switch (type) {
    case LOAD_REVIEWS + SUCCESS:
      return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    case ADD_REVIEW:
      const { text, rating } = review;
      return produce(state, (draft) => {
        draft.entities[reviewId] = { id: reviewId, userId, text, rating }
      });
    default:
      return state;
  }
};
