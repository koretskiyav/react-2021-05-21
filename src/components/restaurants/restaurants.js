import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { restaurantsSelector } from '../../redux/selectors';

const Restaurants = ({ restaurants }) => {
  const defaultRestaurantId = Object.keys(restaurants)[0];
  const [activeId, setActiveId] = useState(defaultRestaurantId);

  const activeRestaurant = useMemo(
    () => restaurants[activeId],
    [activeId, restaurants]
  );

  const tabs = Object.keys(restaurants).map(
    restaurantId => ({ id: restaurantId, title: restaurants[restaurantId].name })
  );

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
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

export default connect((state) => ({
  restaurants: restaurantsSelector(state),
}))(Restaurants);
