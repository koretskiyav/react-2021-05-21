import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';
import { restaurantsSelector } from '../../redux/selectors';

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);

  const activeRestaurant = useMemo(
    () => restaurants[activeId],
    [activeId, restaurants]
  );

  const tabs = Object.keys(restaurants).map((restaurantId) => {
    let restaurantName = restaurants[restaurantId]?.name;
    return { id: restaurantId, title: restaurantName };
  });

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.object.isRequired,
};

export default connect((state) => ({
  restaurants: restaurantsSelector(state),
}))(Restaurants);
