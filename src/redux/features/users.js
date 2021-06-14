import { STATUS } from '../constants';
import api from '../../api';

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { addReview } from '../features/reviews';
import { isLoaded, shouldLoad } from '../utils';

const Users = createEntityAdapter();

const initialState = {
  status: STATUS.idle,
  ...Users.getInitialState(),
  error: null,
};

export const loadUsers = createAsyncThunk('users/load', () => api.loadUsers(), {
  condition: (_, { getState }) => shouldLoadUsersSelector(getState()),
});

const { reducer } = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [loadUsers.pending.type]: (state) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadUsers.fulfilled.type]: (state, action) => {
      state.status = STATUS.fulfilled;
      Users.addMany(state, action);
    },
    [loadUsers.rejected.type]: (state, { error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { meta, payload }) => {
      const { name } = payload.review;
      Users.addOne(state, { id: meta.userId, name });
    },
  },
});

export default reducer;

export const usersSelector = (state) => state.users.entities;
const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
