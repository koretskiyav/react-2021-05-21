import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { shouldLoad } from '../utils';

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

export const orderSelector = (state) => state.order;
export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;

export const getOrderForSubmit = (state) => {
  return Object.keys(state.order)
    .reduce(
      (acc, productId) => {
        return state.order[productId] > 0 ?
          [...acc, { id: productId, amount: state.order[productId] }]
          :
          acc
      },
      []
    );
}
const shouldSubmitOrderSelector = (state) => getOrderForSubmit(state).length > 0;

export const submitOrder = createAsyncThunk(
  'submit/order',
  (order) => api.submitOrder(order),
  {
    condition: (id, { getState }) =>
      shouldSubmitOrderSelector(getState()),
  }
);