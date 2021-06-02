import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Navigation from '../navigation';
import Basket from "../basket";

const Restaurants = ({ restaurants }) => {
  const [activeId, setActiveId] = useState(restaurants[0].id);


  const activeRestaurant = useMemo(
    () => restaurants.find(({ id }) => id === activeId),
    [activeId, restaurants]
  );

   // const [isShowBasket,setShowBasket ] = useState(false);
 // const handleRestaurantClick = setShowBasket(false) && setActiveId


  return (
    <div>
      <Navigation restaurants={restaurants} onRestaurantClick={setActiveId}/>
        <Restaurant restaurant={activeRestaurant} />
         <Basket />
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

export default Restaurants;
