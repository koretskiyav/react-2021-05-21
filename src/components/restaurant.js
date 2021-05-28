import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant(props) {

  const { name, menu, reviews } = props.restaurant

  const restaurantAverageRating = useMemo(
    () => reviews.reduce((acc, { rating }) => acc + rating, 0) / reviews.length,
    [reviews]
  );

  return (
    <div>
      <center><h2>{name} <Rate value={restaurantAverageRating} /></h2></center>
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </div>
  );
}