import { DECREMENT, INCREMENT, REMOVE } from '../constants';
import produce from 'immer';

export default (state = {}, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return produce(state, (draft) => {
        draft[id] = (state[id] || 0) + 1;
      });
    case DECREMENT:
      return produce(state, (draft) => {
        draft[id] = state[id] > 0 ? (state[id] || 0) - 1 : 0;
      });
    case REMOVE:
      return produce(state, (draft) => {
        draft[id] = 0;
      });
    default:
      return state;
  }
};
