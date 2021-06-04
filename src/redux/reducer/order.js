import { DECREMENT, INCREMENT, REMOVEALL } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, id, name, price } = action;
  switch (type) {
    case INCREMENT:
      return {
        ...state,
        [id]: { amount: (state[id]?.amount || 0) + 1, name, price },
      };
    case DECREMENT:
      return {
        ...state,
        [id]: { amount: (state[id]?.amount || 0) - 1, name, price },
      };
    case REMOVEALL:
      delete state[id];
      return {
        ...state,
      };
    default:
      return state;
  }
};
