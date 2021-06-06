import { normalizedRestaurants } from '../../fixtures';
console.log('normalizedRestaurants', normalizedRestaurants)

const defaultRestaurants = normalizedRestaurants.reduce(
    (acc, restaurant) => ({ ...acc, [restaurant.id]: restaurant }),
    {}
);

export default (restaurants = defaultRestaurants, action) => {
  const { type } = action;

  switch (type) {
    default:
      return restaurants;
  }
};
