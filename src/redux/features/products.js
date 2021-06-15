import { createAsyncThunk, createNextState } from '@reduxjs/toolkit';
import { arrToMap, isLoading, shouldLoad } from '../utils';
import { STATUS } from '../constants';
import api from '../../api';

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
  entities: {},
  error: null,
};

export default createNextState((draft = initialState, action) => {
  const { type, payload, meta, error } = action;

  switch (type) {
    case loadProducts.pending.type: {
      draft.status[meta.arg] = STATUS.pending;
      draft.error = null;
      break;
    }
    case loadProducts.fulfilled.type: {
      draft.status[meta.arg] = STATUS.fulfilled;
      Object.assign(draft.entities, arrToMap(payload));
      break;
    }
    case loadProducts.rejected.type: {
      draft.status[meta.arg] = STATUS.rejected;
      draft.error = error;
      break;
    }
    default:
      return draft;
  }
});

export const productsSelector = (state) => state.products.entities;

export const productSelector = (state, { id }) => productsSelector(state)[id];

const productsStatusSelector = (state, props) =>
  state.products.status[props.restaurantId];

export const productsLoadingSelector = isLoading(productsStatusSelector);
const shouldLoadProductsSelector = shouldLoad(productsStatusSelector);
