import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import api from '../../api';
import { STATUS } from '../constants';
import { isLoading } from '../utils';

export const checkout = createAsyncThunk(
  'order/checkout',
  (orderList, { dispatch, rejectWithValue, getState }) =>
    api
      .checkout(
        orderList.map(({ product, amount }) => ({ id: product.id, amount }))
      )
      .then(async (result) => {
        if (result.ok) {
          dispatch(push('/thankyou'));
          dispatch(removeAll(getState()));
        } else {
          const error = await result.json();
          throw error;
        }
      })
      .catch((error) => {
        dispatch(push('/orderError'));
        return rejectWithValue({ error });
      })
);

const Orders = createEntityAdapter();

const initialState = {
  ...Orders.getInitialState(),
  status: STATUS.idle,
  error: null,
};

const { reducer, actions } = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state, { payload: id }) => {
      state.entities[id] = (state.entities[id] || 0) + 1;
    },
    decrement: (state, { payload: id }) => {
      state.entities[id] =
        state.entities[id] > 0 ? (state.entities[id] || 0) - 1 : 0;
    },
    remove: (state, { payload: id }) => {
      state.entities[id] = 0;
    },
    removeAll: (state) => {
      state.entities = {};
    },
  },
  extraReducers: {
    [checkout.pending.type]: (state) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [checkout.fulfilled.type]: (state) => {
      state.status = STATUS.fulfilled;
      state.error = null;
    },
    [checkout.rejected.type]: (state, { payload }) => {
      state.status = STATUS.rejected;
      state.error = payload.error;
    },
  },
});

export default reducer;
const { increment, decrement, remove, removeAll } = actions;
export { increment, decrement, remove };

const ordersSelector = Orders.getSelectors((state) => state.order);

export const orderSelector = ordersSelector.selectEntities;
export const amountSelector = (state, { id }) =>
  ordersSelector.selectById(state, id) || 0;

const orderStatusSelector = (state) => state.order.status;
export const orderIsLoadingSelector = isLoading(orderStatusSelector);
export const orderErrorSelector = (state) => state.order.error;
