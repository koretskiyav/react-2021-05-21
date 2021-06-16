import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const payOrderAction = createAsyncThunk(
  'order/payOrder',
  (_, thunkApi) => {
    console.log("api.payOrder");
    const result = api.payOrder();
    result.then(response => {
      console.log("api.payOrder.response - " + response);
      if (response === "ok") {
        thunkApi.dispatch(setPaySuccessAction());
      }
    });
    return result;
  }
);

export const setPaySuccessAction = createAsyncThunk(
  'order/setPaySuccess',
  () => {
    console.log('setPaySuccessAction - start');
    return new Promise((resolve) => {
      setTimeout(
        () => {
          console.log('setPaySuccessAction - resolve');
          resolve();
        },
        1); // incorrect approach based on the sequence of actions: { redux.order = 'SUCCESS' to show "Success" -> payOrderSuccess: true to keep "success" -> redux.order = {} to clear "success"
    });
  }
);

const { reducer, actions } = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    increment: (state, { payload: id }) => {
      state[id] = (state[id] || 0) + 1;
    },
    decrement: (state, { payload: id }) => {
      state[id] = state[id] > 0 ? (state[id] || 0) - 1 : 0;
    },
    remove: (state, { payload: id }) => {
      state[id] = 0;
    },
    // clearOrder: () => {
    //   return {};
    // }
  },
  extraReducers: {
    [payOrderAction.pending]: (state, { meta }) => {
      state.payStatus = 'STARTED';
      state.error = null;
    },
    [payOrderAction.fulfilled]: (state, action) => {
      if (action.payload !== "ok") {
        // TODO: error
        //state.payStatus = 'ERROR';
        //state.payError = ...;
      }
    },
    [payOrderAction.rejected]: (state, { meta, error }) => {
      // network errors only
      state.payStatus = 'FAIL';
      state.error = error;
    },
    [setPaySuccessAction.pending]: (state, { meta }) => {
      state.payStatus = 'SUCCESS';
      state.error = null;
    },
    [setPaySuccessAction.fulfilled]: (state) => {
      return {};
    }
  },
});

export default reducer;
const { increment, decrement, remove/*, clearOrder: clearOrderAction */ } = actions;
export { increment, decrement, remove };

// Selectors

export const orderSelector = (state) => state.order;
export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;

export const isPayOrderStartedSelector = (state) => orderSelector(state).payStatus === 'STARTED'; // or I can export CONSTS instead
export const isPayOrderSuccessSelector = (state) => orderSelector(state).payStatus === 'SUCCESS';
export const isPayOrderFailedSelector = (state) => orderSelector(state).payStatus === 'FAIL';
