import { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';

const Restaurants = ({ restaurants }) => {
  // const first = ;
  const [activeId, setActiveId] = useState(restaurants[Object.keys(restaurants)[0]].id);

  const activeRestaurant = useMemo(
    () => Object.keys(restaurants).find(r => {
      return restaurants[r].id === activeId
    }),
    [activeId, restaurants]
  );

  const tabs = Object.keys(restaurants).map(r => ({ id: restaurants[r].id, title: restaurants[r].name }));

  return (
    <div>
      <Tabs tabs={tabs} activeId={activeId} onChange={setActiveId} />
      <Restaurant restaurant={restaurants[activeId]} />
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
  restaurants: state.restaurants,
}))(Restaurants);
