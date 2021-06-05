import { normalizedRestaurants } from '../../fixtures';
import { ADD_REVIEW } from '../constants';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, values } = action;

  switch (type) {
    case ADD_REVIEW:
      const { id, restaurantId } = values;
      const newRestaurants = { ...restaurants };
      newRestaurants[restaurantId].reviews = [
        ...restaurants[restaurantId].reviews,
        id,
      ];

      return newRestaurants;
    default:
      return restaurants;
  }
};
