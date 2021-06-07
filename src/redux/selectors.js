import { createSelector } from 'reselect';

export const orderSelector = (state) => state.order;
export const productsSelector = (state) => state.products;
export const reviewsSelector = (state) => state.reviews;
export const restaurantsSelector = (state) => state.restaurants;

export const usersSelector = (state) => state.users;
export const userIdSelector = (_, props) => props.userId;

export const restaurantReviewsSelector = (_, props) =>
  props.restaurant.reviews || [];

export const currentUserSelector = createSelector(
  usersSelector,
  userIdSelector,
  (users, userId) => users[userId].name || 'Anonymous'
);

export const currentRestaurantReviewsSelector = createSelector(
  reviewsSelector,
  restaurantReviewsSelector,
  (reviews, restaurantReviews) =>
    Object.values(reviews).filter((review) =>
      restaurantReviews.includes(review.id)
    )
);

export const averageRatingSelector = createSelector(
  restaurantReviewsSelector,
  (restaurantReviews) =>
    Math.round(
      restaurantReviews.reduce((acc, { rating }) => acc + rating, 0) /
        restaurantReviews.length
    )
);

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }))
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);
