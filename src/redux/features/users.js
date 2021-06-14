import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { STATUS } from '../constants';
import { addReview } from './reviews';
import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';

// actions

export const loadUsers = createAsyncThunk(
  'users/load',
  (id) => api.loadUsers(id),
  {
    condition: (id, { getState }) => shouldLoadUsersSelector(getState()),
  }
);

// reducers

const Users = createEntityAdapter();

const initialState = Users.getInitialState({
  status: {},
  error: null,
});

const { reducer } = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [loadUsers.pending]: (state, { meta }) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.status = STATUS.fulfilled;
      Users.addMany(state, action);
    },
    [loadUsers.rejected]: (state, { meta, error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, action) => {
      // TODO: move to 'AddRestaurantReview reducer'
      Users.addOne(state, { id: action.meta.userId, name: action.payload.review.name });
    },
  },
});

export default reducer;

// selectors

export const usersSelector = (state) => state.users.entities;
const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);

