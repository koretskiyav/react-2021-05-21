import produce from 'immer';
import { ADD_REVIEW } from '../constants';
import { arrToMap } from '../utils';
import { REQUEST, SUCCESS, FAILURE, STATUS, LOAD_USERS } from '../constants';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null
};

export default produce((state = initialState, action) => {
  const { type, review, userId, data, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST:
      return produce(state, (draft) => {
        draft.status = STATUS.pending;
        draft.error = null;
      });
    case LOAD_USERS + SUCCESS:
      return produce(state, (draft) => {
        draft.status = STATUS.fulfilled;
        draft.entities = arrToMap(data);
      });
    case LOAD_USERS + FAILURE:
      return produce(state, (draft) => {
        draft.status = STATUS.rejected;
        draft.error = error;
      });
    case ADD_REVIEW:
      const { name } = review;
      return produce(state, (draft) => {
        draft.entities[userId] = { id: userId, name };
      });
    default:
      return state;
  }
});
