import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Rate from '../../rate';
import styles from './review.module.css';
import { reviewsSelector, usersSelector } from '../../../redux/selectors';

const Review = ({ review: { text, rating }, user: { name } }) => (
  <div className={styles.review} data-id="review">
    <div className={styles.content}>
      <div>
        <h4 className={styles.name} data-id="review-user">
          {name}
        </h4>
        <p className={styles.comment} data-id="review-text">
          {text}
        </p>
      </div>
      <div className={styles.rate}>
        <Rate value={rating} />
      </div>
    </div>
  </div>
);

Review.propTypes = {
  id: PropTypes.string.isRequired,
};

Review.defaultProps = {
  user: 'Anonymous',
};

const mapStateToPros = (state, { id }) => {
  const review = reviewsSelector(state)[id];

  return {
    review,
    user: usersSelector(state)[review.userId],
  };
};

export default connect(mapStateToPros)(Review);
