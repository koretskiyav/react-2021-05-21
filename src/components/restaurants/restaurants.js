import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Loader from '../loader';
import {
  loadRestaurants,
  restaurantsListSelector,
  restaurantsLoadedSelector,
} from '../../redux/features/restaurants';

import styles from './restaurants.module.css';

export function getRestaurantsPath(subPath) {
  if (subPath) {
    return "/restaurants/" + subPath;
  }
  return "/restaurants";
}

const Restaurants = ({ restaurants, loaded, loadRestaurants }) => {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  if (!loaded) return <Loader />;

  return (
    <div>
      <div className={styles.tabs}>
        {restaurants.map(({ id, name }) => (
          <NavLink
            key={id}
            to={getRestaurantsPath(id)}
            className={styles.tab}
            activeClassName={styles.active}
          >
            {name}
          </NavLink>
        ))}
      </div>
      <Switch>
        <Route path={getRestaurantsPath(":restId")}>
          {({ match }) => {
            if (match.params.restId && !restaurants.find(item => item.id === match.params.restId)) {
              return <Redirect to={getRestaurantsPath()} />;
            } else {
              return (<Restaurant id={match.params.restId} />);
            }
          }}
        </Route>
        <Redirect to={getRestaurantsPath(restaurants[0].id)} />
      </Switch>
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
