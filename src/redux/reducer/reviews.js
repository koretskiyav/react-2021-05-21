import { ADD_REVIEW, FAILURE, LOAD_REVIEWS, REQUEST, STATUS, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, review, reviewId, userId, data, error } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      return { ...state, status: STATUS.pending, error: null };
    case LOAD_REVIEWS + SUCCESS:
      return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    case LOAD_REVIEWS + FAILURE:
      return { ...state, status: STATUS.rejected, error };

    case ADD_REVIEW:
      const { text, rating } = review;
      return {
        ...state,
        [reviewId]: { id: reviewId, userId, text, rating }
      };
    default:
      return state;
  }
};
