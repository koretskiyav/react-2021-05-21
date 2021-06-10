import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import { loadReviews, loadUsers } from '../../redux/actions';
import { useEffect } from 'react';
import {
  reviewsLoadedSelector,
  usersLoadingSelector,
  usersLoadedSelector,
  reviewsLoadingSelector
} from '../../redux/selectors';
import Loader from '../loader';

const Reviews = ({ reviews, id, loadReviews, loadUsers, reviewsLoaded, reviewsLoading, usersLoading, usersLoaded }) => {
  useEffect(() => {
    if (!reviewsLoaded) {
      loadReviews(id);
    }
    if (!usersLoading && !usersLoaded) {
      loadUsers();
    }
  }, [loadReviews, loadUsers, usersLoading, usersLoaded, reviewsLoaded, id]);

  if (reviewsLoading || !reviewsLoaded) return <Loader />;

  return (
    <div className={styles.reviews}>
      {reviews.map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restaurantId={id} />
    </div>
  );
};

Reviews.propTypes = {
  id: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

const mapStateToProps = (state, props) => ({
  reviewsLoaded: reviewsLoadedSelector(state, props),
  reviewsLoading: reviewsLoadingSelector(state),
  usersLoading: usersLoadingSelector(state),
  usersLoaded: usersLoadedSelector(state)
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
