import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS } from '../constants';
import { isLoading, shouldLoad } from '../utils';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';

export const loadProducts = createAsyncThunk(
  'products/load',
  (id) => api.loadProducts(id),
  {
    condition: (id, { getState }) =>
      shouldLoadProductsSelector(getState(), { restaurantId: id }),
  }
);

const Products = createEntityAdapter();

const initialState = {
  ...Products.getInitialState(),
  status: {},
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

const productsSelectors = Products.getSelectors((state) => state.products);

export const productsSelector = productsSelectors.selectEntities;
export const productsStatusSelector = (state, props) =>
  state.products.status[props.restaurantId];

export const productsLoadingSelector = isLoading(productsStatusSelector);
export const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);

export const productSelector = (state, { id }) => productsSelector(state)[id];
