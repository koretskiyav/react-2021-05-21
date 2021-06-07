import { createSelector } from 'reselect';
const orderSelector = (state) => state.order;
const productsSelector = (state) => state.products;

export const restaurantsSelector = (state) => state.restaurants;

export const amountSelector = (state, props) => state.order[props.id] || 0;
export const productSelector = (state, props) => state.products[props.id];

export const reviewSelector = (state, props) => state.reviews[props.id];
export const userSelector = (state, props) =>
  state.users[state.reviews[props.id]?.userId];

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
