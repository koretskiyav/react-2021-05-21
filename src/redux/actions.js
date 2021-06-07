import { ADD_REVIEW, ADD_USER, DECREMENT, INCREMENT, REMOVE } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });

export const add_review = (name, text, rating) => {
  
  return { type: ADD_REVIEW, name: name, text: text, rating: rating }
};
export const add_user = (name, text, rating) => ({ type: ADD_USER, name, text, rating });
