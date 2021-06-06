import {
  DECREMENT,
  INCREMENT,
  REMOVE,
  CREATE_REVIEW,
  CREATE_USER,
  INSERT_REVIEW_INTO_RESTAURANTS,
} from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});
export const createUser = (user) => ({ type: CREATE_USER, user });
export const insertReviewInToRestaurants = (values, restId) => ({
  type: INSERT_REVIEW_INTO_RESTAURANTS,
  values,
  restId,
});
