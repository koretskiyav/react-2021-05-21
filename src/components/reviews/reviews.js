import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

const Reviews = ({ reviews, ReviewId }) => {
  const reviewList = Object.values(reviews).map((review) => {
    return (
      <div key={review.id}>
        {ReviewId.some((el) => el === review.id) ? (
          <Review
            userId={review.userId}
            text={review.text}
            rating={review.rating}
          />
        ) : null}
      </div>
    );
  });
  return (
    <div className={styles.reviews}>
      {reviewList}
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
