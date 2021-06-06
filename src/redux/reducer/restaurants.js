import { normalizedRestaurants } from '../../fixtures';
import { POST_REVIEW } from '../constants';
// import { v4 as uuidv4 } from 'uuid';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({
    ...acc,
    [restaurant.id]: restaurant,
  }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, restId, reviewId } = action;

  switch (type) {
    case POST_REVIEW:
      return {
        ...restaurants,
        reviews: restaurants[restId].reviews.push(reviewId),
      };
    default:
      return restaurants;
  }
};
