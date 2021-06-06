import { createSelector } from 'reselect';

const restaurantsSelector = (state) => state.restaurants;
const ordersSelector = (state) => state.order;
const productsSelector = (state) => state.products;
const usersSelector = (state) => state.users;
const reviewsSelector = (state) => state.reviews;

export const orderProductsSelector = createSelector(
  productsSelector,
  ordersSelector,
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

export const reviewUserSelector = (reviewKey) =>
  createSelector(
    usersSelector,
    reviewsSelector,
    (users, reviews) =>
      Object.keys(reviews)
        .map((reviewKey) => reviews[reviewKey])
        .map((review) => ({
          reviewKey: review.id,
          rating: review.rating,
          text: review.text,
          userName: users[review.userId].name,
        }))
        .filter((review) => review.reviewKey === reviewKey)[0]
  );

export const orderProductAmountSelector = (id) =>
  createSelector(orderProductsSelector, (orderProduct) =>
    orderProduct.length > 0
      ? orderProduct
          .filter((order) => order.product.id === id)
          .map((order) => order.amount)[0]
      : 0
  );

export const productSelector = (id) =>
  createSelector(productsSelector, (product) => product[id]);

export const restaurantSelector = createSelector(
  restaurantsSelector,
  (restaurant) => restaurant
);
