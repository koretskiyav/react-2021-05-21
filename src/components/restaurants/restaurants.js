import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(restaurants[Object.keys(restaurants)[0]].id);

  const activeRestaurant = useMemo(
    () => restaurants[activeId],
    [activeId, restaurants]
  );

  const tabs = Object.keys(restaurants).map((id) => ({ id, title: restaurants[id].name }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

Restaurants.propTypes = {
    restaurants: PropTypes.object.isRequired
};

export default connect((state) => ({
  restaurants: state.restaurants,
}))(Restaurants);
