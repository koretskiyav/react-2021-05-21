import PropTypes from 'prop-types';

import Rate from '../../rate';
import styles from './review.module.css';
import {connect} from "react-redux";
import { reviewSelector, reviewUserSelector } from '../../../redux/selectors';

const Review = ({id, review, user}) => {
  const {text, rating } = review;
  const {name} = user;
  return (
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
{
      <div className={styles.rate}>
        <Rate value={rating} />
      </div>
}
    </div>
  </div>
)};

Review.propTypes = {
  id: PropTypes.string.isRequired,
};

Review.defaultProps = {
  user: 'Anonymous',
};

const mapStateToProps = (state, props) => {
  return {
    review: reviewSelector(state, props),
    user: reviewUserSelector(state, props),
  }
};

export default connect(mapStateToProps, null)(Review);
