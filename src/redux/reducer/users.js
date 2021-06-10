import { ADD_REVIEW, FAILURE, LOAD_USERS, REQUEST, STATUS, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null
};


export default (state = initialState, action) => {
  const { type, review, userId, data, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      return { ...state, status: STATUS.pending, error: null };
    case LOAD_USERS + SUCCESS:
      return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    case LOAD_USERS + FAILURE:
      return { ...state, status: STATUS.rejected, error };

    case ADD_REVIEW:
      const { name } = review;
      state[userId] = { id: userId, name };
      break;
    default:
      return state;
  }
};
