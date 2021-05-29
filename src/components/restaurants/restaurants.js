import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Navigation from '../navigation';

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(restaurants[0].id);

  const activeRestaurant = useMemo(
    () => restaurants.find(({ id }) => id === activeId),
    [activeId, restaurants]
  );

  return (
    <div>
      <Navigation restaurants={restaurants} onRestaurantClick={setActiveId} />
      <Restaurant restaurant={activeRestaurant} />
    </div>
  );
};

export default Restaurants;

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
};
