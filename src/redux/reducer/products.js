import { arrToMap } from '../utils';
import { FAILURE, LOAD_PRODUCTS, REQUEST, STATUS, SUCCESS } from '../constants';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return { ...state, status: STATUS.pending, error: null };
    case LOAD_PRODUCTS + SUCCESS:
      return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    case LOAD_PRODUCTS + FAILURE:
      return { ...state, status: STATUS.rejected, error };

    default:
      return state;
  }
};
