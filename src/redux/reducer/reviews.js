import { normalizedReviews } from '../../fixtures';
import { objectFromInitialData } from '../../utils/utils';
import { ADD_REVIEW } from '../constants';

const defaultReviews = objectFromInitialData(normalizedReviews);

export default (reviews = defaultReviews, action) => {
  const { type, values } = action;

  switch (type) {
    case ADD_REVIEW:
      return { ...reviews, [values.id]: values };
    default:
      return reviews;
  }
};
