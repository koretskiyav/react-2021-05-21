import { createSelector } from 'reselect';

export const orderSelector = (state) => state.order;
export const productsSelector = (state) => state.products;
export const restaurantsSelector = (state) => state.restaurants;
export const reviewsSelector = (state) => state.reviews;
export const usersSelector = (state) => state.users;

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

export const ratingsSelector = createSelector(
  restaurantsSelector,
  reviewsSelector,
  (restaurants, reviews) => {
    return Object.values(restaurants)
      .map(({ id, reviews: reviewsId }) => ({
        [id]: reviewsId.map((reviewId) => reviews[reviewId].rating),
      }))
      .reduce((acc, rating) => ({ ...acc, ...rating }), {});
  }
);
