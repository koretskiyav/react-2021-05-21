import {DECREMENT, DELETING, INCREMENT} from '../constants';

// { [productId]: mode }
export default (state = [], action) => {
  const { type, id } = action;
  switch (type) {
    case DELETING:
      return { ...state, [id] : false };
    default:
      return state;
  }
};
