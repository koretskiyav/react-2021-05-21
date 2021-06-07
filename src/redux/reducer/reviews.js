import {normalizedReviews  } from '../../fixtures';
import { ADD_REVIEW } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type } = action;

  switch (type) {
    case ADD_REVIEW:
      
      const newReview = {
        id: action.generatedId,
        userId: action.name,
        text: action.text,
        rating: action.rating,
      }
      return {...reviews, [action.generatedId]: {...newReview}}
    default:
      return reviews;
  }
};
