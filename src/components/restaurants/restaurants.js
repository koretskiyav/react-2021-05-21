import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import Loader from '../loader';
import {
  restaurantsListSelector,
  restaurantsLoadedSelector,
  shouldLoadRestaurantsSelector,
} from '../../redux/features/restaurants';
import { loadRestaurants } from '../../redux/features/restaurants';

const Restaurants = ({ restaurants, loaded, shouldLoad, loadRestaurants }) => {
  const [activeId, setActiveId] = useState(restaurants[0]?.id);

  useEffect(() => {
    if (shouldLoad) loadRestaurants();
    setActiveId(restaurants[0]?.id);
  }, [restaurants, loaded]); // eslint-disable-line
  const restaurantId = activeId || restaurants[0]?.id;

  if (!loaded) return <Loader />;

  const tabs = restaurants.map(({ id, name }) => ({ id, title: name }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={restaurantId} onChange={setActiveId} />
      <Restaurant id={restaurantId} />
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

const mapStateToProps = (state, props) => ({
  restaurants: restaurantsListSelector(state),
  loaded: restaurantsLoadedSelector(state),
  shouldLoad: shouldLoadRestaurantsSelector(state),
});

export default connect(mapStateToProps, { loadRestaurants })(Restaurants);
