import { useState, useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Navigation from './navigation';

export default function Restaurants(props) {
  const [activeId, setActiveId] = useState(props.restaurants[0].id);

  const activeRestaurant = useMemo(
    () => props.restaurants.find((restaurant) => restaurant.id === activeId),
    [activeId, props.restaurants]
  );

  return (
    <div>
      <Navigation
        restaurants={props.restaurants}
        onRestaurantClick={setActiveId}
      />
      <Reviews reviews={activeRestaurant.reviews} />
      <Menu menu={activeRestaurant.menu} />
    </div>
  );
}
