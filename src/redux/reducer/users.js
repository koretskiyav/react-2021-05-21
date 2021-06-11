import produce from 'immer';
import { LOAD_USERS, STATUS, REQUEST, SUCCESS, FAILURE } from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default produce((draft = initialState, action) => {
  const { type, payload, meta, data, error } = action;

  switch (type) {
    case LOAD_USERS + REQUEST: {
      draft.status = STATUS.pending;
      draft.error = null;
      break;
    }
    case LOAD_USERS + SUCCESS: {
      draft.status = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(data));
      break;
    }
    case LOAD_USERS + FAILURE: {
      draft.status = STATUS.rejected;
      draft.error = error;
      break;
    }
    case addReview.type:
      const { name } = payload.review;
      draft.entities[meta.userId] = { id: meta.userId, name };
      break;
    default:
      return draft;
  }
});
