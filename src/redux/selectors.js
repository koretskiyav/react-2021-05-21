import { createSelector } from 'reselect';

const restaurantsSelector = (state) => state.restaurants;
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products;
const reviewsSelector = (state) => state.reviews;
const usersSelector = (state) => state.users;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
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

export const averageRatingSelector = createSelector(
  reviewsSelector,
  (_, props) => props.restaurant.reviews,
  (reviews, ids) => {
    const ratings = ids.map((id) => reviews[id].rating);
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating) / ratings.length
    );
  }
);

const reviewSelector = createSelector(
  reviewsSelector,
  (_, props) => props.id,
  (reviews, id) => reviews[id]
);

export const reviewInfoSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => {
    return {
      ...review,
      user: users[review.userId].name,
    };
  }
);

export const productSelector = createSelector(
  productsSelector,
  (_, props) => props.id,
  (products, id) => products[id]
);

export const productAmountSelector = createSelector(
  orderSelector,
  (_, props) => props.id,
  (orders, id) => orders[id] || 0
);
