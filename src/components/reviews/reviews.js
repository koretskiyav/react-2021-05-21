import PropTypes from 'prop-types';

import Review from './review';
import styles from './reviews.module.css';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {!reviews || !reviews.length
        ? 'No reviews'
        : reviews
            .filter((i) => i)
            .map((review) => <Review key={review.id} {...review} />)}
    </div>
  );
};

Reviews.prototypes = {
  reviews: PropTypes.arrayOf({ id: PropTypes.string.isRequired }), // for "key={review.id}"
  // reviews.ArrayIsNotEmpty - empty array markup will confuse clients, support this value in markup
  // reviews.isRequired - null/undefined can be handled as ArrayIsNotEmpty
};

export default Reviews;
