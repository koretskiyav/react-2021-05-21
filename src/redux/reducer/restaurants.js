import { normalizedRestaurants } from '../../fixtures';
import { ADDREVIEW } from '../constants';

const defaultRestaurants = normalizedRestaurants.reduce(
  (acc, restaurant) => ({
    ...acc,
    [restaurant.id]: restaurant,
  }),
  {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type, id, reviewId } = action;
  console.log(action);
  switch (type) {
    case ADDREVIEW:
      restaurants[id].reviews.push(reviewId);
      return {
        ...restaurants,
        [id]: restaurants[id],
      };
    default:
      return restaurants;
  }
};
