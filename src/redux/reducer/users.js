import { normalizedUsers } from '../../fixtures';
import { REVIEW_FORM_SUBMIT_ID } from '../constants';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

export default (users = defaultUsers, action) => {
  const { type, newReviewWithId } = action;

  switch (type) {
    case REVIEW_FORM_SUBMIT_ID: {
      const { newUserId, name } = newReviewWithId;
      return {
        ...users,
        [newUserId]: { id: newUserId, name },
      };
    }

    default:
      return users;
  }
};
