import Menu from './menu';
import Rate from './rate';
import Reviews from './reviews';

export default function Restaurant(props) {
  const sumReviews= props.reviews.reduce((sum, current) => sum + current.rating, 0);
  const numberOfReviews = props.reviews.length;
  const ratingRestaurant = Math.round(sumReviews / numberOfReviews);

  return (
    <div>
      <Rate value={ratingRestaurant} />
      <p>({numberOfReviews})</p>
      <Menu menu={props.menu} />
      <Reviews reviews={props.reviews} />
    </div>
  )
}