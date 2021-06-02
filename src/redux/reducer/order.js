import { DECREMENT, INCREMENT, REMOVE } from '../constants';

function increment(value) {
  return (value || 0) + 1;
}
// { [productId]: amount }
export default (state = 0, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1, version: increment(state.version) };
    case DECREMENT:
      return { ...state, [id]: (state[id] || 0) - 1, version: increment(state.version) };
    case REMOVE:
      const stateCopy = { ...state };
      delete stateCopy[id];
      return { ...stateCopy, version: increment(state.version) };
    default:
      return state;
  }
};
