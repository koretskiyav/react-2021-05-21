import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS } from '../constants';
import { arrToMap } from '../utils';

export const loadProducts = createAsyncThunk(
  'products/load',
  (id) => api.loadProducts(id),
);

const initialState = {
  status: {},
  entities: {},
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
      Object.assign(state.entities, arrToMap(action.payload));
      // Reviews.addMany(state, action);
    },
    [loadProducts.rejected.type]: (state, { meta, error }) => {
      state.status[meta.arg] = STATUS.rejected;
      state.error = error;
    },
  }
});

export default reducer;

export const productsSelector = (state) => state.products.entities;
export const productSelector = (state, { id }) => productsSelector(state)[id];
