import { createSelector } from '@reduxjs/toolkit';
import { orderSelector } from './features/order';
import { restaurantSelector } from './features/restaurants';
import { reviewSelector, reviewsSelector } from './features/reviews';
import { isLoaded, isLoading, shouldLoad } from './utils';

const productsSelector = (state) => state.products.entities;
const usersSelector = (state) => state.users.entities;

const productsStatusSelector = (state, props) =>
  state.products.status[props.restaurantId];
const usersStatusSelector = (state) => state.users.status;

export const productsLoadingSelector = isLoading(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);

export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);

export const productSelector = (state, { id }) => productsSelector(state)[id];

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

export const reviewWitUserSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => ({
    ...review,
    user: users[review.userId]?.name,
  })
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  restaurantSelector,
  (reviews, restaurant) => {
    const ratings = restaurant.reviews.map((id) => reviews[id]?.rating || 0);
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating, 0) / ratings.length
    );
  }
);
