import { useEffect } from 'react';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import {
  reviewsIsLoadingSelector,
  reviewsIsLoadedSelector,
  usersIsLoadingSelector,
  usersIsLoadedSelector,
} from '../../redux/selectors';
import styles from './reviews.module.css';
import { loadReviews, loadUsers } from '../../redux/actions';
import Loader from '../loader';

const Reviews = ({
  reviews,
  restaurantId,
  loadReviews,
  isLoadingReviews,
  isLoadedReviews,
  isLoadingUsers,
  isLoadedUsers,
  loadUsers,
}) => {
  useEffect(() => {
    if (!isLoadingReviews && !isLoadedReviews) {
      loadReviews(restaurantId);
    }
  }, [loadReviews, restaurantId, isLoadingReviews, isLoadedReviews]);

  useEffect(() => {
    if (!isLoadingUsers && !isLoadedUsers) {
      loadUsers();
    }
  }, [isLoadingUsers, isLoadedUsers, loadUsers]);

  const isNotReady =
    isLoadingReviews || !isLoadedReviews || isLoadingUsers || !isLoadedUsers;

  if (isNotReady) return <Loader />;

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  isLoadingReviews: reviewsIsLoadingSelector(state, props),
  isLoadedReviews: reviewsIsLoadedSelector(state, props),
  isLoadingUsers: usersIsLoadingSelector(state),
  isLoadedUsers: usersIsLoadedSelector(state),
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
