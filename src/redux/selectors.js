import { createSelector } from 'reselect';

export const restaurantsSelector = (state) => state.restaurants;
export const orderSelector = (state) => state.order;
export const productsSelector = (state) => state.products;
const reviewsSelector = (state) => state.reviews;
const usersSelector = (state) => state.users;

export const reviewsUsersSelector = createSelector(
  reviewsSelector,
  usersSelector,
  (reviews, users) =>
    Object.values(reviews)
      .map((review) => ({
        user: users[review.userId].name,
        text: review.text,
        rating: review.rating,
        id: review.id
      }))
      .reduce((acc, review) => ({ ...acc, [review.id]: review }), {})
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

export const tabsSelector = createSelector(
  restaurantsSelector,
  (restaurants) =>
    Object.values(restaurants).map((restaurant) => ({
      id: restaurant.id,
      title: restaurant.name,
    }))
)
