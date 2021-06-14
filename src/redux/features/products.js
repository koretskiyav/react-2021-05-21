import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { STATUS } from '../constants';
import api from '../../api';
import { isLoading, shouldLoad } from '../utils';

const Products = createEntityAdapter();

export const loadProducts = createAsyncThunk(
  'products/load',
  (id) => api.loadProducts(id),
  {
    condition: (id, { getState }) =>
      shouldLoadProductsSelector(getState(), { restaurantId: id }),
  }
);

const initialState = {
  status: {},
  ...Products.getInitialState(),
  error: null,
};

const { reducer } = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [loadProducts.pending.type]: (state, { meta }) => {
      state.status[meta.arg] = STATUS.pending;
      state.error = null;
    },
    [loadProducts.fulfilled.type]: (state, action) => {
      state.status[action.meta.arg] = STATUS.fulfilled;
      Products.addMany(state, action);
    },
    [loadProducts.rejected.type]: (state, { meta, error }) => {
      state.status[meta.arg] = STATUS.rejected;
      state.error = error;
    },
  },
});

export default reducer;

export const productsSelector = (state) => state.products.entities;

const productsStatusSelector = (state, props) =>
  state.products.status[props.restaurantId];

export const productsLoadingSelector = isLoading(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);

export const productSelector = (state, { id }) => productsSelector(state)[id];
