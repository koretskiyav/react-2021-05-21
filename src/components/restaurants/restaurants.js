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

const Restaurants = ({ restaurants, loaded, loadRestaurants }) => {
  useEffect(() => {
    loadRestaurants();
  }, []); // eslint-disable-line

  if (!loaded) return <Loader />;

  function getPath(subPath) {
    if (subPath) {
      return "/restaurants/" + subPath;
    }
    return "/restaurants";
  }

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
      <Switch>
        <Route path={getPath(":restId")}>
          {({ match }) => {
            if (match.params.restId && !restaurants.find(item => item.id === match.params.restId)) {
              return <Redirect to={getPath()} />;
            } else {
              return (<Restaurant id={match.params.restId} />);
            }
          }}
        </Route>
        <Redirect to={getPath(restaurants[0].id)} />
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
