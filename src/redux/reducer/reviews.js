import { normalizedReviews } from '../../fixtures';

const defaultReviews = normalizedReviews.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export default (reviews = defaultReviews, action) => {
  const { type } = action;

  switch (type) {
    default:
      return reviews;
  }
};
