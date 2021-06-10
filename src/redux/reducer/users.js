import produce from 'immer';
import {ADD_REVIEW, FAILURE, LOAD_USERS, REQUEST, SUCCESS} from '../constants';

import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null
};

export default produce((draft = initialState, action) => {
  const { type, review, userId, data, error } = action;

  switch (type) {

    case LOAD_USERS + REQUEST:
      draft.loading = true;
      draft.error = null;
      break;

    case LOAD_USERS + SUCCESS:
      draft.loading = false;
      draft.loaded = true;
      draft.entities = arrToMap(data);
      break;

    case LOAD_USERS + FAILURE:
      draft.loading = false;
      draft.loaded = false;
      draft.error = error;
      break;

    case ADD_REVIEW:
      const { name } = review;
      draft[userId] = { id: userId, name };
      draft.entities[userId] = { id: userId, name };
      break;

    default:
      return draft;
  }
});