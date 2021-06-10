import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews, loadUsers } from '../../redux/actions';
import { Component } from 'react';
import { isLoadingUsersAndReviewsSelector } from '../../redux/selectors';
import Loader from '../loader';

class Reviews extends Component {
  state = { reviews: null, restaurantId: null, loadReviews: null, isLoading: true }; // TODO: ': null' is not a default value, it is required to compile code

  componentDidMount() {
    // TODO: unmount + mount or new Menu will send dublicated request
    this.props.loadReviews && this.props.loadReviews();
    this.props.loadUsers && this.props.loadUsers();
  }

  render() {
    if (this.props.isLoading) {
      return (<Loader />);
    }

    return (
      <div className={styles.reviews}>
        { this.props.reviews && this.props.reviews.map((id) => (
          <Review key={id} id={id} />
        ))}
        { this.props.restaurantId && <ReviewForm restaurantId={this.props.restaurantId} />}
      </div>
    );
  }
};

Reviews.propTypes = {
  restaurantId: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: isLoadingUsersAndReviewsSelector(state)
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
