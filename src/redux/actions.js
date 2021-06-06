import { DECREMENT, INCREMENT, REMOVE, SET_ACTIVE_RESTAURANT_ID, CREATE_NEW_REVIEW, ADD_REVIEW, ADD_USER, ADD_REVIEW_TO_RESTAURANT } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const setActiveRestaurantId = (id) => ({ type: SET_ACTIVE_RESTAURANT_ID, id });
export const createNewReview = (rawReview) => ({ type: CREATE_NEW_REVIEW, rawReview });
export const addReview = (review) => ({ type: ADD_REVIEW, review });
export const addUser = (user) => ({ type: ADD_USER, user });
export const addReviewToRestaurant = ({ restaurantId, reviewId }) => ({ type: ADD_REVIEW_TO_RESTAURANT, restaurantId, reviewId });
