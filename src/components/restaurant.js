import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant(props) {
  const restaurantRatingsSum = props.restaurant.reviews.reduce((accumulator, review) => {
    return accumulator + review.rating
  }, 0);
  const restaurantAverageRating = Math.round(restaurantRatingsSum / props.restaurant.reviews.length);

  return (
    <div>
      <center><h2>{props.restaurant.name} <Rate value={restaurantAverageRating} /></h2></center>
      <Menu menu={props.restaurant.menu} />
      <Reviews reviews={props.restaurant.reviews} />
    </div>
  );
}