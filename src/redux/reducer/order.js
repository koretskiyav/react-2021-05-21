import { DECREMENT, INCREMENT, DELETING } from '../constants';

// { [productId]: amount }
export default (state = 0, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT:
      return { ...state, [id]: (state[id] > 0 ? state[id] - 1 : 0) };
    case DECREMENT:
      return { ...state, [id]: (state[id] || 0) - 1 };
    case DELETING:
      return { ...state, [id]: 0 };
    default:
      return state;
  }
};
