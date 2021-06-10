import produce from 'immer';
import {
  ADD_REVIEW,
  LOAD_USERS,
  FAILURE,
  REQUEST,
  SUCCESS,
  STATUS,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  status: STATUS.idle,
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, review, userId, data, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      return { ...draft, status: STATUS.pending, error: null };
    case LOAD_USERS + SUCCESS:
      return { ...draft, status: STATUS.fulfilled, entities: arrToMap(data) };
    case LOAD_USERS + FAILURE:
      return { ...draft, status: STATUS.rejected, error };
    case ADD_REVIEW:
      const { name } = review;
      draft[userId] = { id: userId, name };
      break;
    default:
      return draft;
  }
});
