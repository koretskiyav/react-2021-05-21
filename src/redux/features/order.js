import {createSelector, createSlice} from '@reduxjs/toolkit';
import {orderSelector, orderProductsSelector} from "../selectors";

const { reducer, actions } = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    increment: (state, { payload: id }) => {
      state[id] = (state[id] || 0) + 1;
    },
    decrement: (state, { payload: id }) => {
      state[id] = state[id] > 0 ? (state[id] || 0) - 1 : 0;
    },
    remove: (state, { payload: id }) => {
      state[id] = 0;
    },
  },
});

export default reducer;
const { increment, decrement, remove } = actions;
export { increment, decrement, remove };

export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;

export const totalSelector = createSelector(
    orderProductsSelector,
    (orderProducts) =>
        orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

