import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reviewUserSelector } from '../../../redux/selectors';

import Rate from '../../rate';
import styles from './review.module.css';

const Review = ({ review }) => {
  return (
    <div className={styles.review} data-id="review">
      <div className={styles.content}>
        <div>
          <h4 className={styles.name} data-id="review-user">
            {review.userName}
          </h4>
          <p className={styles.comment} data-id="review-text">
            {review.text}
          </p>
        </div>
        <div className={styles.rate}>
          <Rate value={review.rating} />
        </div>
      </div>
    </div>
  );
};

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number,
};

Review.defaultProps = {
  user: 'Anonymous',
};

const mapStateToProps = (state, props) => {
  return {
    review: reviewUserSelector(props.reviewKey)(state),
  };
};

export default connect(mapStateToProps)(Review);
