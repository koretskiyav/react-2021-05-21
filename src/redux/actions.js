import { DECREMENT, INCREMENT, REMOVE, ADD_USER_AND_REVIEW, ADD_USER, ADD_REVIEW, ADD_REVIEW_TO_RESTAURANT } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });

export const addUserAndReview = (values) => ({ type: ADD_USER_AND_REVIEW, values });
export const addUser = (values) => ({ type: ADD_USER, values });
export const addReview = (values) => ({ type: ADD_REVIEW, values });
export const addReviewToRestaurant = (values) => ({ type: ADD_REVIEW_TO_RESTAURANT, values });
