import { DECREMENT, INCREMENT, REMOVE_PRODUCT } from '../constants';

// { [productId]: amount }
export default (state = 0, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: (state[id] || 0) - 1 };
    case REMOVE_PRODUCT:
      return { ...state, [id]: 0 };
    default:
      return state;
  }
};