import { DECREMENT, INCREMENT, REMOVE } from '../constants';

// { [productId]: amount }
export default (state = 0, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT: {
      const amount = state[id] || 0;
      const newState = { ...state, [id]: amount > 0 ? amount - 1 : 0 };

      if (newState[id] === 0) {
        delete newState[id];
      }

      return newState;
    }
    case REMOVE: {
      const copy = { ...state };
      delete copy[id];
      return { ...copy };
    }
    default:
      return state;
  }
};
