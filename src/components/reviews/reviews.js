import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews, loadUsers } from '../../redux/actions';
import { useEffect } from 'react';
import {
  restaurantReviewsLoadedSelector,
  restaurantReviewsLoadingSelector, usersLoadedSelector,
  usersLoadingSelector
} from "../../redux/selectors";
import Loader from "../loader";

const Reviews = ({ reviews, restaurantId, loadReviews, reviewsLoaded,reviewsLoading, usersLoading,usersLoaded }) => {
  useEffect(() => {
    if (!reviewsLoading && !reviewsLoaded) loadReviews(restaurantId);
  }, [loadReviews, reviewsLoading, reviewsLoaded, restaurantId]);

  useEffect(() => {
    if (!usersLoading && !usersLoaded) loadUsers();
  }, [usersLoading, usersLoaded]);

  if (reviewsLoading || usersLoading) return <Loader />;
  if (!reviewsLoaded || !usersLoaded) return 'No data :(';


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
  reviewsLoading: restaurantReviewsLoadingSelector(state, props),
  reviewsLoaded: restaurantReviewsLoadedSelector(state, props),
  usersLoading: usersLoadingSelector(state),
  usersLoaded: usersLoadedSelector(state),
});

Reviews.propTypes = {
  restaurantId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
