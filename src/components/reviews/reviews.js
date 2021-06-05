import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {Object.values(reviews).map((review) => (
        <Review
          key={review.id}
          user={review.userId}
          text={review.text}
          rating={review.rating}
        />
      ))}
      <ReviewForm />
    </div>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default connect((state) => ({
  reviews: state.reviews,
}))(Reviews);
