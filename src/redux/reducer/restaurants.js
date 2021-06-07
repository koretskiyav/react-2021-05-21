import {normalizedRestaurants} from '../../fixtures';
import {ADD_REVIEW_TO_RESTAURANT, ADD_USER} from "../constants";

const defaultRestaurants = normalizedRestaurants.reduce(
    (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
    {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    case ADD_REVIEW_TO_RESTAURANT:
      const {restaurantId, reviewId} = action.values;
      return {...restaurants, [restaurantId]: {...restaurants[restaurantId], reviews: [...restaurants[restaurantId].reviews, reviewId]}};
    default:
      return restaurants;
  }
};
