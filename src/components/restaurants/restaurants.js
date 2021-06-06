import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(Object.keys(restaurants)[0]);

  const activeRestaurant = restaurants[activeId];
  const tabs = Object.keys(restaurants).map((key) => ({
    id: key,
    title: restaurants[key].name,
  }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect((state) => ({
  restaurants: state.restaurants,
}))(Restaurants);
