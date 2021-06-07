import { normalizedReviews } from '../../fixtures';
import { CREATE_REVIEW } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REVIEW:
      const { text, rating, reviewId, userId } = payload;
      return { ...reviews, [reviewId]: { id: reviewId, userId, text, rating } };
    default:
      return reviews;
  }
};
