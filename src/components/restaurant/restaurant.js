import { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import styles from './restaurant.module.css';

const Restaurant = ({ restaurant }) => {
  const { id, name, menu, reviews } = restaurant ? restaurant : {};

  const averageRating = useMemo(() => {
    if (!reviews || !reviews.length) {
      const total = reviews.reduce((acc, { rating }) => acc + rating, 0);
      return Math.round(total / reviews.length);
    } else {
      return undefined; // handle null/undefined/empty reviews array instead of PropTypes.ArrayIsNotEmpty
    }
  }, [reviews]);

  return (
    <div>
      {!restaurant ? (
        <Banner heading={'Restaurant is not available'}></Banner>
      ) : (
        <Fragment>
          <Banner heading={name}>
            <Rate value={averageRating} />
          </Banner>
          <div className={styles.restaurant}>
            <Menu menu={menu} key={id} />
            <Reviews reviews={reviews} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired, // for "acc + rating" (avoid incorrect result if null/undefined is passed)
      })
    ),
    id: PropTypes.string.isRequired, // for "key={restaurant.id}"
    // name: PropTypes.string, // not used, passed to Banner
    // menu - not used, passed to Menu
  }),
  // restaurant.isRequired - handled via "restaurant ? restaurant : {};" and 'Restaurant is not available'
};

export default Restaurant;
