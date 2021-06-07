import {
  DECREMENT,
  INCREMENT,
  REMOVE,
  REVIEW_FORM_SUBMIT,
  REVIEW_FORM_SUBMIT_ID,
} from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const remove = (id) => ({ type: REMOVE, id });
export const reviewFormSubmit = (newReview) => ({
  type: REVIEW_FORM_SUBMIT,
  newReview,
});
export const reviewFormSubmitId = (newReviewWithId) => ({
  type: REVIEW_FORM_SUBMIT_ID,
  newReviewWithId,
});
