import { normalizedRestaurants } from '../../fixtures';

const defaultRestaurants = normalizedRestaurants.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export default (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    default:
      return restaurants;
  }
};
