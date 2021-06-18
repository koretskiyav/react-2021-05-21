import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Rate from '../../rate';
import styles from './review.module.css';
<<<<<<< HEAD
import { reviewWitUserSelector } from '../../../redux/selectors';
=======
import PropTypes from 'prop-types';
>>>>>>> origin/master

const Review = ({ user, text, rating }) => (
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

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number.isRequired,
};

Review.defaultProps = {
  user: 'Anonymous',
  text: 'Text is missing'
};

Review.propTypes = {
  user:PropTypes.string,
  text:PropTypes.string,
  rating: PropTypes.number.isRequired

};

const mapStateToProps = reviewWitUserSelector;

export default connect(mapStateToProps)(Review);
