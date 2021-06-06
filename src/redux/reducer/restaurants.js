import { normalizedRestaurants } from '../../fixtures';
import { objectFromInitialData } from '../../utils/utils';
import { ADD_REVIEW } from '../constants';

const defaultRestaurants = objectFromInitialData(normalizedRestaurants);

export default (restaurants = defaultRestaurants, action) => {
  const { type, values } = action;

  switch (type) {
    case ADD_REVIEW:
      const { id, restaurantId } = values;
      const needleRestaurantCopy = { ...restaurants[restaurantId] };
      needleRestaurantCopy.reviews = [...needleRestaurantCopy.reviews, id];

      return { ...restaurants, [restaurantId]: needleRestaurantCopy };
    default:
      return restaurants;
  }
};
