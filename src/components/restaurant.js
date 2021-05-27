import React from 'react'

import Reviews from './reviews';
import Menu from './menu';
import Rate from './rate';

export default function Restaurant(props) {
  const getRating = () => {
    let sum = 0;
    props.activeRestaurant.reviews.forEach((item) => {sum+=item.rating});
    return sum / props.activeRestaurant.reviews.length;
  }

  return (
    <div>
      <b>Рейтинг ресторана:</b>
      <Rate key = {props.activeRestaurant.id} value={getRating()} />
      <br></br>
      <Reviews reviews = {props.activeRestaurant.reviews} />
      <Menu menu={props.activeRestaurant.menu} />
      
    </div>
  )
}
