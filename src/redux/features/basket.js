import { createAsyncThunk } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import api from '../../api';
import { removeAll } from './order';

export const sendOrder = createAsyncThunk(
  'order/send',
  (order, { dispatch }) => {
    return api
      .sendOrder(order)
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'ok') {
          return dispatch(
            push({
              pathname: '/basket-error',
              state: data,
            })
          );
        }
        dispatch(push('/thank-you'));
        dispatch(removeAll());
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
);
