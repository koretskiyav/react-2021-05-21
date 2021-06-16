import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api';

export const payOrderAction = createAsyncThunk(
  'order/payOrder',
  (_, thunkApi) => {
    console.log("api.payOrder");
    const result = api.order();
    result.then(response => {
      console.log("api.payOrder.response - " + response);
      if (response === "ok") {
        thunkApi.dispatch(setPaySuccessAction());
      } else {
        thunkApi.dispatch(setPayFailedAction({ response }));
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

export const setPayFailedAction = createAsyncThunk(
  'order/setPayFailed',
  () => {
    console.log('setPayFailedAction - start');
    return new Promise((resolve) => {
      setTimeout(
        () => {
          console.log('setPayFailedAction - resolve');
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
    // setPayFailed: (state, { payload }) => {
    //   console.log('setPayFailed');
    //   state.payStatus = PAY_STATUS.failed;
    //   state.error = payload.response;
    // },
    // clearPayFailed: (state) => {
    //   console.log('clearPayFailed');
    //   state.payStatus = undefined;
    //   state.error = undefined;
    // }
    // clearOrder: () => {
    //   return {};
    // }
  },
  extraReducers: {
    [payOrderAction.pending]: (state, { meta }) => {
      state.payStatus = PAY_STATUS.started;
      state.error = null;
    },
    [payOrderAction.rejected]: (state, { meta, error }) => {
      // network errors only
      state.payStatus = PAY_STATUS.failed;
      state.error = error;
    },
    [setPaySuccessAction.pending]: (state, { meta }) => {
      state.payStatus = PAY_STATUS.success;
      state.error = null;
    },
    [setPaySuccessAction.fulfilled]: (state) => {
      return {};
    },
    [setPayFailedAction.pending]: (state, action) => {
      state.payStatus = PAY_STATUS.failed;
      state.error = action.meta.arg.response;
    },
    [setPayFailedAction.fulfilled]: (state) => {
      state.payStatus = null;
      state.error = null;
    }
  },
});

export default reducer;
const { increment, decrement, remove/*, clearPayFailed: clearPayFailedAction, setPayFailed: setPayFailedAction , clearOrder: clearOrderAction */ } = actions;
export { increment, decrement, remove };

// Selectors

export const orderSelector = (state) => state.order;
export const amountSelector = (state, { id }) => orderSelector(state)[id] || 0;

export const getPayOrderStatusSelector = (state) => {
  const result = orderSelector(state).payStatus;
  console.log("isPayOrderFailedSelector " + result);
  return result;
}

export const getPayOrderFailureMessageSelector = (state) => {
  const result = orderSelector(state).error;
  console.log("getPayOrderFailureMessageSelector " + result);
  return result;
}

export const PAY_STATUS = {
  started: 'STARTED',
  success: 'SUCCESS',
  failed: 'FAILED',
};
