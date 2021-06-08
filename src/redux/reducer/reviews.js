import { ADDREVIEW } from '../constants';
import { normalizedReviews } from '../../fixtures';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({
    ...acc,
    [review.id]: review,
  }),
  {}
);

export default (reviews = defaultReviews, action) => {
  console.log(reviews);
  const { type, reviewId, rating, text, userId } = action;

  switch (type) {
    case ADDREVIEW:
      return {
        ...reviews,
        [reviewId]: { id: reviewId, rating, text, userId },
      };
    default:
      return reviews;
  }
};
