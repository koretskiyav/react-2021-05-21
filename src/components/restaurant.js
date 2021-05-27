import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant(props) {

  const { name, menu, reviews } = props.restaurant

  const restaurantRatingsSum = reviews.reduce((accumulator, { rating }) => accumulator + rating, 0);
  const restaurantAverageRating = Math.round(restaurantRatingsSum / reviews.length);

  return (
    <div>
      <center><h2>{name} <Rate value={restaurantAverageRating} /></h2></center>
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </div>
  );
}