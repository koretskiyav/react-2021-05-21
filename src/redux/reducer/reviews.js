import { normalizedReviews } from '../../fixtures';
import { POST_REVIEW } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({
    ...acc,
    [review.id]: review,
  }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, text, rating, userId, reviewId } = action;
  switch (type) {
    case POST_REVIEW:
      return {
        ...reviews,
        [reviewId]: {
          id: reviewId,
          userId: userId,
          text: text,
          rating: rating,
        },
      };
    default:
      return reviews;
  }
};
