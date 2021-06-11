import { createSelector } from '@reduxjs/toolkit';
import { STATUS } from './constants';

export const arrToMap = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

export const isLoading = (statusSelector) => (state, props) =>
  statusSelector(state, props) === STATUS.pending;

export const isLoaded = (statusSelector) => (state, props) =>
  statusSelector(state, props) === STATUS.fulfilled;

export const shouldLoad = (statusSelector) =>
  createSelector(
    statusSelector,
    (status) => status !== STATUS.pending && status !== STATUS.fulfilled
  );
