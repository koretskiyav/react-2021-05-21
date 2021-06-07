import { createSelector } from 'reselect';

// const restaurantsSelector = (state) => state.restaurants;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products;

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

const usersSelector =  (state) => state.users;

export const reviewsSelector =  (state) => state.reviews;

export const reviewSelector =  (state, props) => state.reviews[props.id];

export const reviewUserSelector = createSelector(
    reviewSelector,
    usersSelector,
    (review, users) => users[review.userId]
);

export const amountSelector =  (state, props) => state.order[props.id] || 0;

const productIdSelector =  (state, props) => props.id;

export const productSelector = createSelector(
    productsSelector,
    productIdSelector,
    (products, productId) => products[productId]
);
