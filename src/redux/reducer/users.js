import produce from 'immer';
import { ADD_REVIEW, LOAD_USERS, STATUS, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, data, review, userId } = action;

  switch (type) {
    case LOAD_USERS + SUCCESS:
      draft.status = STATUS.fulfilled;
      draft.entities = arrToMap(data);
      break;
    case ADD_REVIEW:
      const { name } = review;
      draft[userId] = { id: userId, name };
      break;
    default:
      return draft;
  }
});
