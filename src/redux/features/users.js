import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import api from '../../api';

import { STATUS } from '../constants';
import { addReview } from '../features/reviews';
import { isLoaded, shouldLoad } from '../utils';

const Users = createEntityAdapter();

const initialState = {
  ...Users.getInitialState(),
  status: STATUS.idle,
  error: null,
};

export const loadUsers = createAsyncThunk('users/load', () => api.loadUsers(), {
  condition: (_, { getState }) => {
    return shouldLoadUsersSelector(getState());
  },
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
    [addReview.type]: (state, { payload, meta }) => {
      const { name } = payload.review;
      const { userId } = meta;
      Users.addOne(state, { id: userId, name });
    },
  },
});

export default reducer;

export const usersSelectors = Users.getSelectors((state) => state.users);

export const usersSelector = usersSelectors.selectEntities;
const usersStatusSelector = (state) => state.users.status;
export const usersLoadedSelector = isLoaded(usersStatusSelector);
export const shouldLoadUsersSelector = shouldLoad(usersStatusSelector);
