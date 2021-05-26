import { useState, useMemo, Fragment } from 'react';
import Navigation from './navigation';
import Restaurant from './Restaurant';

export default function Restaurants(props) {
  const [activeId, setActiveId] = useState(props.restaurants[0].id);

  const activeRestaurant = useMemo(
    () => props.restaurants.find((restaurant) => restaurant.id === activeId),
    [activeId, props.restaurants]
  );

  return (
    <Fragment>
      <Navigation
        restaurants={props.restaurants}
        onRestaurantClick={setActiveId}
      />
      <Restaurant restaurant={activeRestaurant} />
    </Fragment>
  );
}
