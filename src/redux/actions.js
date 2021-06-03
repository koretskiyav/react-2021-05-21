import { DECREMENT, INCREMENT, DELETING } from './constants';

export const increment = (id) => ({ type: INCREMENT, id });
export const decrement = (id) => ({ type: DECREMENT, id });
export const deleting = (id) => ({ type: DELETING, id });
