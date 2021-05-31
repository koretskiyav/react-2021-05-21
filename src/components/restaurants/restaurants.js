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

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      menu: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          price: PropTypes.number,
          ingredients: PropTypes.arrayOf(PropTypes.string),
        })
      ),
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          user: PropTypes.string,
          text: PropTypes.string,
          rating: PropTypes.number,
        })
      ),
    })
  ),
};

export default Restaurants;
