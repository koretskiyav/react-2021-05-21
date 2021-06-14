import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';
import { STATUS } from '../constants';
import { addReview } from '../features/reviews';
import { arrToMap, isLoaded, shouldLoad } from '../utils';

export const loadUsers = createAsyncThunk('users/load', () => api.loadUsers(), {
  condition: (_, { getState }) => shouldLoadUsersSelector(getState()),
});

const initialState = {
  status: STATUS.idle,
  entities: {},
  error: null,
};

const { reducer } = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [loadUsers.pending.type]: (state, { meta }) => {
      state.status = STATUS.pending;
      state.error = null;
    },
    [loadUsers.fulfilled.type]: (state, { meta, payload }) => {
      state.status = STATUS.fulfilled;
      Object.assign(state.entities, arrToMap(payload));
    },
    [loadUsers.rejected.type]: (state, { meta, error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { meta, payload }) => {
      const { name } = payload.review;
      state.entities[meta.userId] = { id: meta.userId, name };
    },
  },
});

export default reducer;

export const usersSelector = (state) => state.users.entities;

const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
