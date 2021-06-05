import { normalizedReviews } from '../../fixtures';
import { ADD_REVIEW } from '../constants';

const defaultReviews = normalizedReviews.reduce(
  (acc, review) => ({ ...acc, [review.id]: review }),
  {}
);

export default (reviews = defaultReviews, action) => {
  const { type, values } = action;

  switch (type) {
    case ADD_REVIEW:
      const { text, rating, id, userId } = values;
      return { ...reviews, [id]: { id, userId, text, rating } };
    default:
      return reviews;
  }
};
