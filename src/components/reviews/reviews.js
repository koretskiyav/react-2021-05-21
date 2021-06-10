import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import {
  reviewsLoadingSelector,
  reviewsLoadedSelector,
  usersLoadingSelector,
  usersLoadedSelector,
} from '../../redux/selectors';

import { loadReviews, loadUsers } from '../../redux/actions';
import { useEffect } from 'react';
import Loader from '../loader';

const Reviews = ({
  reviews,
  restaurantId,
  loadReviews,
  loading,
  loaded,
  loadingUsers,
  loadedUsers,
  loadUsers,
}) => {
  useEffect(() => {
    if (!loading && !loaded) {
      loadReviews(restaurantId);
    }
    if (!loadingUsers && !loadedUsers) {
      loadUsers();
    }
  }, [
    loadReviews,
    loadUsers,
    restaurantId,
    loading,
    loaded,
    loadingUsers,
    loadedUsers,
  ]);

  if (loading || !loaded) return <Loader />;

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
  loading: reviewsLoadingSelector(state, props),
  loaded: reviewsLoadedSelector(state, props),
  loadingUsers: usersLoadingSelector(state),
  loadedUsers: usersLoadedSelector(state),
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
