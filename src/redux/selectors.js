import { createSelector } from 'reselect';

const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products;
const usersSelector = (state) => state.users;
const reviewsSelector = (state) => state.reviews;
const restaurantReviewsIdsSelector = (state, props) => props.restaurant.reviews;
const reviewUserIdSelector = (state, props) => props.userId;
export const productSelector = (state, props) => state.products[props.id];
export const amountSelector = (state, props) => state.order[props.id] || 0;
export const restaurantsSelector = (state) => state.restaurants;

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

export const restaurantReviewsSelector = createSelector(
  reviewsSelector,
  restaurantReviewsIdsSelector,
  (reviews, restaurantReviewsIds) => restaurantReviewsIds.reduce((acc, reviewId) => ({ ...acc, [reviewId]: reviews[reviewId] }), {}),
);

export const userNameSelector = createSelector(
  usersSelector,
  reviewUserIdSelector,
  (users, reviewUserId) => users[reviewUserId] ? users[reviewUserId].name : 'Anonymous'
);
