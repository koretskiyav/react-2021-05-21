import { FAILURE, LOAD_PRODUCTS, REQUEST, STATUS, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  status: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, data, error, restaurantId } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return {
        ...state,
        status: { ...state.status, [restaurantId]: STATUS.pending },
        error: null,
      };
    case LOAD_PRODUCTS + SUCCESS:
      return {
        ...state,
        status: { ...state.status, [restaurantId]: STATUS.fulfilled },
        entities: { ...state.entities, ...arrToMap(data) },
      };
    case LOAD_PRODUCTS + FAILURE:
      return {
        ...state,
        status: { ...state.status, [restaurantId]: STATUS.rejected },
        error,
      };
    default:
      return state;
  }
};
