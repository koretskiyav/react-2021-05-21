import { DECREMENT, INCREMENT, REMOVE, POST_REVIEW } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const postReview = (restId, name, text, rating) => ({
  type: POST_REVIEW,
  restId,
  name,
  text,
  rating,
});
