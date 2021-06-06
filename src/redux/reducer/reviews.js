import { normalizedReviews } from '../../fixtures';
import { CREATE_REVIEW } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);
export default (reviews = defaultReviews, action) => {
  const { type, review } = action;

  switch (type) {
    case CREATE_REVIEW:
      return { ...reviews, [review.id]: review };
    default:
      return reviews;
  }
};
