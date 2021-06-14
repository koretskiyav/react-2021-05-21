import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { isLoading, shouldLoad } from '../utils';
import { STATUS } from '../constants';
import api from '../../api';

// actions

export const loadProducts = createAsyncThunk(
  'products/loadByReastaurant',
  (restaurantId) => api.loadProducts(restaurantId),
  {
    condition: (id, { getState }) => shouldLoadProductsSelector(getState(), { restaurantId: id })
  }
);

// reducer

const Products = createEntityAdapter();

const initialState = Products.getInitialState({
  status: {},
  error: null,
});

const slice = createSlice({
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

export default slice.reducer;

// selectors

const { selectEntities, selectById } = Products.getSelectors((state) => state[slice.name]);

export const productsSelector = selectEntities;
export const productSelector = (state, { id }) => selectById(state, id);

const productsStatusSelector = (state, props) => state[slice.name].status[props.restaurantId];
export const productsLoadingSelector = isLoading(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
