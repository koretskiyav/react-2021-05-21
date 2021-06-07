import { normalizedReviews } from '../../fixtures';
import { ADD_REVIEW } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, payload, userId, reviewId } = action;
  console.log('action', action);

  switch (type) {
    case ADD_REVIEW:
      const { text, rating } = payload.review;
      return {
        ...reviews,
        [reviewId]: { id: reviewId, userId, text, rating },
      };
    default:
      return reviews;
  }
};
