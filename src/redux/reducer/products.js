import { createNextState } from '@reduxjs/toolkit';
import { arrToMap } from '../utils';
import { LOAD_PRODUCTS, REQUEST, SUCCESS, FAILURE, STATUS } from '../constants';

const initialState = {
  status: {},
  entities: {},
  error: null,
};

export default createNextState((draft = initialState, action) => {
  const { type, restaurantId, data, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST: {
      draft.status[restaurantId] = STATUS.pending;
      draft.error = null;
      break;
    }
    case LOAD_PRODUCTS + SUCCESS: {
      draft.status[restaurantId] = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(data));
      break;
    }
    case LOAD_PRODUCTS + FAILURE: {
      draft.status[restaurantId] = STATUS.rejected;
      draft.error = error;
      break;
    }
    default:
      return draft;
  }
});
