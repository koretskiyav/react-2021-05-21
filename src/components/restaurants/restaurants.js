import { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Loader from '../loader';
import {
  loadRestaurants,
  restaurantsListSelector,
  restaurantsLoadedSelector,
} from '../../redux/features/restaurants';

import styles from './restaurants.module.css';

const Restaurants = ({ restaurants, loaded, loadRestaurants, match }) => {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  if (!loaded) return <Loader />;

  const { restId } = match.params;

  // console.log(match);
  return (
    <div>
      <div className={styles.tabs}>
        {restaurants.map(({ id, name }) => (
          <NavLink
            key={id}
            to={`/restaurants/${id}`}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {name}
          </NavLink>
        ))}
      </div>
      <Restaurant id={restId} />
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  restaurants: restaurantsListSelector(state),
  loaded: restaurantsLoadedSelector(state),
});

export default connect(mapStateToProps, { loadRestaurants })(Restaurants);
