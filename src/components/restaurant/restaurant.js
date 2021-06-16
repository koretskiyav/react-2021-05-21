import { connect } from 'react-redux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import { averageRatingSelector } from '../../redux/selectors';
import { restaurantSelector } from '../../redux/features/restaurants';
import { getRestaurantsPath } from '../restaurants/restaurants';
import styles from './restaurant.module.css';

const Restaurant = ({ restaurant, averageRating }) => {
  const { id, name, menu, reviews } = restaurant;

  const tabs = [
    { id: 'menu', title: 'Menu' },
    { id: 'reviews', title: 'Reviews' },
  ];

  function getPath(subPath) {
    if (subPath) {
      return getRestaurantsPath(restaurant.id) + '/' + subPath;
    }
    return getRestaurantsPath(restaurant.id)
  }

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>

      <div className={styles.tabs}>
        {tabs.map(({ id, title }) => (
          <NavLink
            key={id}
            to={getPath(id)}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {title}
          </NavLink>
        ))}
      </div>

      <Switch>
        <Route path={getPath('menu')} component={() => <Menu menu={menu} key={id} restaurantId={id} />} />
        <Route path={getPath('reviews')} component={() => <Reviews reviews={reviews} restaurantId={id} />} />
        <Redirect to={getPath('menu')} />
      </Switch>
    </div>
  );
};

Restaurant.propTypes = {
  restaurant: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    menu: PropTypes.array,
    reviews: PropTypes.array,
  }).isRequired,
  averageRating: PropTypes.number,
};

const mapStateToProps = (state, props) => ({
  restaurant: restaurantSelector(state, props),
  averageRating: averageRatingSelector(state, props),
});

export default connect(mapStateToProps)(Restaurant);
