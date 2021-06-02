import { DECREMENT, INCREMENT, REMOVE } from '../constants';

// { [productId]: amount }
export default (state = {}, action) => {
  const { type, id } = action;
  switch (type) {
    case INCREMENT:
      return { ...state, [id]: (state[id] || 0) + 1 };
    case DECREMENT: {
      const value = state[id] || 0;
      const newState = { ...state, [id]: value > 0 ? value - 1 : 0 };

      if (newState[id] === 0) {
        delete newState[id];
      }

      return newState;
    }
    case REMOVE: {
      const newState = { ...state, [id]: 0 };
      delete newState[id];
      return newState;
    }
    default:
      return state;
  }
};
