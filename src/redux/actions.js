import { DECREMENT, INCREMENT, REMOVE, CREATE_PRODUCT_REVIEW } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const createProductReview = (reviewData) => ({ type: CREATE_PRODUCT_REVIEW, reviewData });
