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

const slice = createSlice({
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

export default slice.reducer;

// selectors

const { selectEntities } = Users.getSelectors(state => state[slice.name]);

export const usersSelector = selectEntities;
const usersStatusSelector = (state) => state[slice.name].status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);

