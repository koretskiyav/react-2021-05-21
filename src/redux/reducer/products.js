import produce from 'immer';
import {
  FAILURE,
  LOAD_PRODUCTS,
  LOAD_RESTAURANTS,
  REQUEST,
  STATUS,
  SUCCESS,
} from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  statuses: {},
  entities: {},
  error: null,
};

export default produce((draft, action) => {
  const { type, restaurantId, data, error } = action;

  switch (type) {
    case LOAD_RESTAURANTS + SUCCESS:
      draft.statuses = data.reduce(
        (accum, restaurant) => ({
          ...accum,
          [restaurant.id]: STATUS.idle,
        }),
        {}
      );
      break;
    case LOAD_PRODUCTS + REQUEST:
      draft.statuses[restaurantId] = STATUS.pending;
      draft.error = null;
      break;
    case LOAD_PRODUCTS + SUCCESS:
      draft.statuses[restaurantId] = STATUS.fulfilled;
      draft.entities = { ...draft.entities, ...arrToMap(data) };
      break;
    case LOAD_PRODUCTS + FAILURE:
      draft.statuses[restaurantId] = STATUS.rejected;
      draft.error = error;
      break;
    default:
      return draft;
  }
}, initialState);
