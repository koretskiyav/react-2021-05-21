import produce from 'immer';
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
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, review, reviewId, userId, data, error } = action;

  switch (type) {
    case LOAD_REVIEWS + REQUEST:
      draft.status = STATUS.pending;
      draft.error = null;
      return draft;

    case LOAD_REVIEWS + SUCCESS:
      draft.status = STATUS.fulfilled;
      draft.entities = Object.assign(draft.entities, arrToMap(data));
      return draft;

    case LOAD_REVIEWS + FAILURE:
      draft.status = STATUS.rejected;
      draft.error = error;
      return draft;

    case ADD_REVIEW:
      const { text, rating } = review;
      draft[reviewId] = { id: reviewId, userId, text, rating };
      return draft;

    default:
      return draft;
  }
});
