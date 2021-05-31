import PropTypes from 'prop-types';

import Review from './review';
import styles from './reviews.module.css';
import { DataIds } from './reviews.dataids';

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      {!reviews || !reviews.length ? (
        <div key="no_reviews" data-testid={DataIds.isNotAvailable}>
          'No reviews'
        </div>
      ) : (
        <div key="has_reviews">
          {reviews
            .filter((i) => i)
            .map((review) => (
              <Review key={review.id} review={review} />
            ))}
        </div>
      )}
    </div>
  );
};

Reviews.prototypes = {
  reviews: PropTypes.arrayOf({
    // for "key={review.id}"
    id: PropTypes.string.isRequired,
  }),
  // reviews.ArrayIsNotEmpty - empty array markup will confuse clients, support this value in markup
  // reviews.isRequired - null/undefined can be handled as ArrayIsNotEmpty
};

export default Reviews;
