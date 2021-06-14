import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { isLoading, shouldLoad } from '../utils';
import { STATUS } from '../constants';
import api from '../../api';

// actions

export const loadProducts = createAsyncThunk(
  'products/loadByReastaurant',
  async (restaurantId) => await api.loadProducts(restaurantId),
  {
    condition: (id, { getState }) => {
      return shouldLoadProductsSelector(getState(), { restaurantId: id });
    }
  }
);

// reducer

const Products = createEntityAdapter();

const initialState = Products.getInitialState({
  status: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [loadProducts.pending]: (state, action) => {
      state.status[action.meta.arg] = STATUS.pending;
      state.error = null;
    },
    [loadProducts.fulfilled]: (state, action) => {
      state.status[action.meta.arg] = STATUS.fulfilled;
      Products.addMany(state, action);
    },
    [loadProducts.rejected]: (state, action) => {
      state.status[action.arg] = STATUS.rejected;
      state.error = action.error;
    },
  }
});

export default reducer;

// selectors
// TODO: Products.getSelectors();

export const productsSelector = (state) => state.products.entities;
export const productSelector = (state, { id }) => productsSelector(state)[id];

const productsStatusSelector = (state, props) => state.products.status[props.restaurantId];
export const productsLoadingSelector = isLoading(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
