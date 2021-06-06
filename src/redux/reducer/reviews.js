import { ADD_REVIEW } from '../constants';
import { normalizedReviews } from '../../fixtures';

const defaultReviews = normalizedReviews.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export default (reviews = defaultReviews, action) => {
  const { type } = action;

  switch (type) {
    case ADD_REVIEW:
      return { ...reviews, [Object.keys(reviews).length /* TODO: change to uuid */]: action.reviewData };
    default:
      return reviews;
  }
};
