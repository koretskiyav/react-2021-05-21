import { useMemo } from 'react';
import Menu from '../menu';
import Reviews from '../reviews';
import PropTypes from 'prop-types';
import Banner from '../banner';
import Rate from '../rate';
import styles from './restaurant.module.css';

const Restaurant = ({ restaurant }) => {
  const { name, menu, reviews } = restaurant;

  const averageRating = useMemo(() => {
    const total = reviews.reduce((acc, { rating }) => acc + rating, 0);
    return Math.round(total / reviews.length);
  }, [reviews]);

  return (
    <div>
      <Banner heading={name}>
        <Rate value={averageRating} />
      </Banner>
      <div className={styles.restaurant}>
        <Menu menu={menu} key={restaurant.id} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};

Restaurant.propTypes = {
  name: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      ingredients: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.string,
      text: PropTypes.string,
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default Restaurant;
