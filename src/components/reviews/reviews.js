import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { usersLoadingSelector, usersLoadedSelector } from '../../redux/selectors';
import { loadReviews, loadUsers } from '../../redux/actions';
import { useEffect } from 'react';

const Reviews = ({ reviews, restaurantId, usersLoading, usersLoaded, loadReviews, loadUsers }) => {
  useEffect(() => {
    loadReviews(restaurantId);
  }, [loadReviews, restaurantId]);

  useEffect(() => {
    if (!usersLoading && !usersLoaded) loadUsers();
  }, [usersLoading, usersLoaded]);

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  restaurantId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(state => ({
  usersLoading: usersLoadingSelector(state),
  usersLoaded: usersLoadedSelector(state),
}), { loadReviews, loadUsers })(Reviews);
