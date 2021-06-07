import { normalizedRestaurants } from '../../fixtures';
import {ADD_REVIEW} from "../constants";


const defaultRestaurants = normalizedRestaurants.reduce(
    (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
    {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_REVIEW: {
      const { id, restaurantId } = payload;
      const restaurantWithAddedReview = restaurants[restaurantId];
      restaurantWithAddedReview.reviews = [...restaurantWithAddedReview.reviews, id];
      return {   ...restaurants, [restaurantId]: restaurantWithAddedReview};
    }

    default:
      return restaurants;
  }
};
