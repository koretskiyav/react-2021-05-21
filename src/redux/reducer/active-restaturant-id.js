import { normalizedRestaurants } from '../../fixtures';
import { SET_ACTIVE_RESTAURANT_ID } from '../constants';

const defaultRestaurantId = normalizedRestaurants[0].id;

export default (activeRestaturantId = defaultRestaurantId, action) => {
  const { type, id } = action;

  switch (type) {
    case SET_ACTIVE_RESTAURANT_ID:
      return id;
    default:
      return activeRestaturantId;
  }
};
