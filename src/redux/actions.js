import { DECREMENT, INCREMENT, REMOVE_PRODUCT } from './constants';

export const increment = (id, name, price) => ({
  type: INCREMENT,
  id,
  name,
  price,
});
export const decrement = (id, name, price) => ({
  type: DECREMENT,
  id,
  name,
  price,
});

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  id,
});
