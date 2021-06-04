import {
  DECREMENT,
  INCREMENT,
  REMOVEALL,
  ADD_GOOD,
  REMOVE_GOOD,
} from './constants';

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
export const removeAll = (id) => ({
  type: REMOVEALL,
  id,
});
export const addGood = (id) => ({ type: ADD_GOOD, id });
export const removeGood = (id) => ({ type: REMOVE_GOOD, id });
