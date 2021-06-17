import { createSelector, createSlice } from '@reduxjs/toolkit';

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
    removeAll: (state) => {
      Object.keys(state).forEach((id) => (state[id] = 0));
    },
  },
});

export default reducer;
const { increment, decrement, remove, removeAll } = actions;
export { increment, decrement, remove, removeAll };

export const orderSelector = (state) => state.order;
export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;
export const orderToArraySelector = createSelector(orderSelector, (order) =>
  Object.keys(order).map((key) => ({ id: key, amount: order[key] }))
);
