import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

const Reviews = ({ reviews, restaurantId }) => {
  return (
    <div className={styles.reviews}>
      {reviews.map((review) => (
        <Review key={review} reviewKey={review} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Reviews;
