import { useState, useMemo } from 'react';

import Navigation from './navigation';
import Restorant from './restorant';

export default function Restaurants(props) {
  const [activeId, setActiveId] = useState(props.restaurants[0].id);

  const activeRestaurant = useMemo(
    () => props.restaurants.find((restaurant) => restaurant.id === activeId),
    [activeId, props.restaurants]
  );

  console.log('activeRestaurant', activeRestaurant)

  return (
    <div>
      <Navigation
        restaurants={props.restaurants}
        onRestaurantClick={setActiveId}
      />
      <Restorant restaurant={activeRestaurant} />

    </div>
  );
}
