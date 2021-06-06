import { normalizedRestaurants } from '../../fixtures';
import { ADD_REVIEW_TO_RESTAURANT } from '../constants';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, restaurantId, reviewId } = action;

  switch (type) {
    case ADD_REVIEW_TO_RESTAURANT:
      const updatedRestaurantReviews = [...restaurants[restaurantId].reviews, reviewId];
      const updatedRestaurant = { ...restaurants[restaurantId], reviews: updatedRestaurantReviews };
      return { ...restaurants, [restaurantId]: updatedRestaurant }
    default:
      return restaurants;
  }
};
