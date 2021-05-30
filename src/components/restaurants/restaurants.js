import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Navigation from '../navigation';

function getActiveId(restaurants) {
  return !restaurants || !restaurants.length || !restaurants[0]
    ? null
    : restaurants[0].id;
}

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(getActiveId(restaurants));

  useEffect(() => {
    setActiveId(getActiveId(restaurants));
  }, [restaurants]);

  const activeRestaurant = useMemo(
    () =>
      !restaurants || !restaurants.length
        ? null
        : restaurants.find((item) => (item && item.id) === activeId), //  find({id}) -> Cannot destructure property 'id' of 'undefined' as it is undefined.
    [activeId, restaurants]
  );

  return (
    <div>
      <Navigation restaurants={restaurants} onRestaurantClick={setActiveId} />
      {!activeRestaurant ? (
        'No active restaurant, select one'
      ) : (
        <Restaurant restaurant={activeRestaurant} />
      )}
    </div>
  );
};

Restaurant.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })), // for "restaurants.lenght" and "restaurants[0].id" and "restaurants.find(({ id })"
  // restaurants.ArrayIsNotEmpty - empty array markup will confuse clients, support this value in markup
  // restaurants.isRequired - null/undefined can be handled as ArrayIsNotEmpty
};

export default Restaurants;
