import { REQUEST, SUCCESS, FAILURE, STATUS, LOAD_PRODUCTS } from '../constants';
import { arrToMap } from '../utils';
import produce from 'immer';

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, data, error } = action;

  switch (type) {
    case LOAD_PRODUCTS + REQUEST:
      return produce(state, (draft) => {
        draft.status = STATUS.pending;
        draft.error = null;
      });
    case LOAD_PRODUCTS + SUCCESS:
      return produce(state, (draft) => {
        draft.status = STATUS.fulfilled;
        draft.entities = { ...draft.entities, ...arrToMap(data) };
      });
    case LOAD_PRODUCTS + FAILURE:
      return produce(state, (draft) => {
        draft.status = STATUS.rejected;
        draft.error = error;
      });
    default:
      return state;
  }
};
