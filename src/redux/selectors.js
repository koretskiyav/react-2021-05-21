import { createSelector } from 'reselect';
import { STATUS } from './constants';

const restaurantsSelector = (state) => state.restaurants.entities;
const orderSelector = (state) => state.order;

const productsSelector = (state) => state.products.entities;
export const isLoadingProductsSelector = (state) => state.products.status !== STATUS.fulfilled;

const reviewsSelector = (state) => state.reviews.entities;
export const isLoadingReviewsSelector = (state) => state.reviews.status !== STATUS.fulfilled;

const usersSelector = (state) => {
  /*
  TODO: ???
  if(state.users.status != STATUS.fulfilled) {
    dispatch({ type: LOAD_USERS + REQUEST, restaurantId });
  }*/
  return state.users.entities;
}
export const isLoadingUsersSelector = (state) => state.users.status !== STATUS.fulfilled;

export const isLoadingUsersAndReviewsSelector = createSelector(
  isLoadingUsersSelector,
  isLoadingReviewsSelector,
  (isLoadingUsers, isLoadingReviews) => isLoadingUsers || isLoadingReviews
);

export const restaurantsLoadingSelector = (state) =>
  state.restaurants.status === STATUS.pending;

export const restaurantsLoadedSelector = (state) =>
  state.restaurants.status === STATUS.fulfilled;

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);

export const restaurantSelector = (state, { id }) =>
  restaurantsSelector(state)[id];
export const productSelector = (state, { id }) => productsSelector(state)[id];
export const reviewSelector = (state, { id }) => reviewsSelector(state)[id];
export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;

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
  (review, users) => {
    if (!review || !users || !review.userId || !users[review.userId]) {
      return {};
    }

    return {
      ...review,
      user: users[review.userId]?.name,
    };
  }
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  restaurantSelector,
  (reviews, restaurant) => {
    if (!reviews || !restaurant || !restaurant.reviews) return 0;

    const ratings = restaurant.reviews.map((id) => { return reviews[id] ? reviews[id].rating : 0; });
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating) / ratings.length
    );
  }
);
