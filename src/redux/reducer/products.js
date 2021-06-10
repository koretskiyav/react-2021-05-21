import { LOAD_PRODUCTS, STATUS, SUCCESS } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case LOAD_PRODUCTS + SUCCESS:
      return { ...state, status: STATUS.fulfilled, entities: arrToMap(data) };
    default:
      return state;
  }
};
