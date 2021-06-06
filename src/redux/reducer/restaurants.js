import { normalizedRestaurants } from '../../fixtures';
import { INSERT_REVIEW_INTO_RESTAURANTS } from '../constants';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    case INSERT_REVIEW_INTO_RESTAURANTS:
      return { ...restaurants, [action.restaurant.id]: action.restaurant };
    default:
      return restaurants;
  }
};
