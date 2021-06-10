import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import Loader from '../loader';

import { loadReviews, loadUsers } from '../../redux/actions';
import { useCallback, useEffect } from 'react';
import {
  reviewsLoadedSelector,
  reviewsLoadingSelector,
  usersLoadedSelector,
  usersLoadingSelector,
} from '../../redux/selectors';

const Reviews = ({
  reviews,
  restaurantId,
  loadReviews,
  loadUsers,
  usersLoaded,
  usersLoading,
  reviewsLoaded,
  reviewsLoading,
}) => {
  const loadUsersS = useCallback(() => {
    !usersLoaded && !usersLoading && loadUsers();
  }, [loadUsers, usersLoaded, usersLoading]);

  const loadReviewsS = useCallback(() => {
    !reviewsLoaded && !reviewsLoading && loadReviews(restaurantId);
  }, [loadReviews, restaurantId, reviewsLoaded, reviewsLoading]);

  useEffect(() => {
    loadUsersS();
    loadReviewsS();
  }, [loadReviews, loadReviewsS, loadUsers, loadUsersS, restaurantId]);

  if (!usersLoaded || !reviewsLoaded) return <Loader />;

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

const mapStateToProps = (state, props) => ({
  reviewsLoaded: reviewsLoadedSelector(state, props),
  reviewsLoading: reviewsLoadingSelector(state, props),
  usersLoaded: usersLoadedSelector(state, props),
  usersLoading: usersLoadingSelector(state, props),
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
