import produce from 'immer';
import {
  ADD_REVIEW,
  LOAD_USERS,
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
  const { type, review, userId, data, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      draft.status = STATUS.pending;
      draft.error = null;
      return draft;

    case LOAD_USERS + SUCCESS:
      draft.status = STATUS.fulfilled;
      draft.entities = Object.assign(draft.entities, arrToMap(data));
      return draft;

    case LOAD_USERS + FAILURE:
      draft.status = STATUS.rejected;
      draft.error = error;
      return draft;

    case ADD_REVIEW:
      const { name } = review;
      draft[userId] = { id: userId, name };
      break;

    default:
      return draft;
  }
});
