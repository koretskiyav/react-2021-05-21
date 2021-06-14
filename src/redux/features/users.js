import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { STATUS } from '../constants';
import { isLoaded, shouldLoad } from '../utils';
import api from '../../api';
import { addReview } from './reviews';
export const LOAD_USERS = 'LOAD_USERS';

export const loadUsers = createAsyncThunk('users/load', () => api.loadUsers(), {
  condition: (id, { getState }) => shouldLoadUsersSelector(getState()),
});

const Users = createEntityAdapter();

const initialState = {
  ...Users.getInitialState(),
  status: {},
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
    [loadUsers.fulfilled.type]: (state, action) => {
      state.status = STATUS.fulfilled;
      Users.addMany(state, action);
    },
    [loadUsers.rejected.type]: (state, { meta, error }) => {
      state.status = STATUS.rejected;
      state.error = error;
    },
    [addReview.type]: (state, { meta, payload }) => {
      state.entities[meta.userId] = {
        id: meta.userId,
        name: payload.review.name,
      };
    },
  },
});

export default reducer;

const usersSelectors = Users.getSelectors((state) => state.users);
export const usersSelector = usersSelectors.selectEntities;

export const usersStatusSelector = (state) => state.users.status;

export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
