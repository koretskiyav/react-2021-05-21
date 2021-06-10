import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews, loadUsers } from '../../redux/actions';
import { useEffect } from 'react';
import { reviewsLoadedSelector, reviewsLoadingSelector } from '../../redux/selectors';
import Loader from '../loader';

const Reviews = ({ reviews, restaurantId, loadReviews, loadUsers }) => {
  useEffect(() => {
    loadReviews(restaurantId);
  }, [loadReviews, restaurantId]);

  useEffect(()=>{
    if (!reviewsLoadingSelector && !reviewsLoadedSelector){
      return <Loader/>
    }

    loadUsers();
  },[loadUsers])

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

export default connect((state)=>({
  loading: reviewsLoadingSelector(state),
  loaded: reviewsLoadedSelector(state)

}), { loadReviews, loadUsers })(Reviews);
