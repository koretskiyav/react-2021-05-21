import Rate from '../../rate';
import styles from './review.module.css';
import PropTypes from 'prop-types';


const Review = ({ user, text, rating }) => (
  <div className={styles.review} data-id="review">
    <div className={styles.content} data-id="review-name-and-text">
      <div>
        <h4 className={styles.name} data-id="review-name">{user}</h4>
        <p className={styles.comment} data-id="review-text">{text}</p>
      </div>
      <div className={styles.rate} data-id="review-stars">
        <Rate value={rating} />
      </div>
    </div>
  </div>
);

// Review.defaultProps = {
//   user: 'Anonymous',
// };

Review.propTypes = {
  user: PropTypes.string,
  text: PropTypes.string,
  rating: PropTypes.number,
}

export default Review;
