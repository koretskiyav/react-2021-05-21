import { DECREMENT, INCREMENT, DISCARD } from '../constants';

// { [productId]: amount }
export default (state = 0, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: (state[id] || 0) - 1 };
    case DISCARD:
      const { [id]: discardedProduct, ...resultState } = state;
      return resultState;
    default:
      return state;
  }
};
