import produce from 'immer';
import {
  ADD_REVIEW,
  FAILURE,
  LOAD_USERS,
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
  const { type, review, userId, data, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      draft.status = STATUS.pending;
      draft.error = null;
      break;
    case LOAD_USERS + SUCCESS:
      draft.status = STATUS.fulfilled;
      draft.entities = arrToMap(data);
      break;
    case LOAD_USERS + FAILURE:
      draft.status = STATUS.rejected;
      draft.error = error;
      break;
    case ADD_REVIEW:
      const { name } = review;
      draft.entities[userId] = { id: userId, name };
      break;
    default:
      return draft;
  }
}, initialState);
