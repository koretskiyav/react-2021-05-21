import { normalizedRestaurants } from '../../fixtures';
import { CREATE_REVIEW } from '../constants';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REVIEW:
      const { reviewId, restaurantId } = payload;
      return {
        ...restaurants,
        [restaurantId]: {
          ...restaurants[restaurantId],
          reviews: [...restaurants[restaurantId].reviews, reviewId],
        },
      };
    default:
      return restaurants;
  }
};
