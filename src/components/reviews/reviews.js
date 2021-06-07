import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import { connect } from 'react-redux';
import { reviewsSelector } from '../../redux/selectors';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {Object.keys(reviews).map((review) => (
        <Review key={reviews[review].id} {...reviews[review]} />
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

export default connect((state)=>({
  reviews: reviewsSelector(state)
}))(Reviews);
