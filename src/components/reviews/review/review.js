import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Rate from '../../rate';
import { reviewsUsersSelector } from '../../../redux/selectors';
import styles from './review.module.css';

const Review = ({ review }) => {
  const {
    user, text, rating
  }
  = review;
  return (
    <div className={styles.review} data-id="review">
      <div className={styles.content}>
        <div>
          <h4 className={styles.name} data-id="review-user">
            {user}
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
};

Review.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number
  }).isRequired,
}

const mapStateToProps = (state, props) => ({
  review: reviewsUsersSelector(state)[props.id],
});

export default connect(mapStateToProps)(Review);
