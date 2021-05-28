import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurants(props) {
  return (
    <div>
      <Menu menu={props.restaurant.menu} />
      <Reviews reviews={props.restaurant.reviews} />
      {'Total rating is:'}
      <Rate
        value={
          props.restaurant.reviews.reduce(
            (total, review) => total + review.rating,
            0
          ) / props.restaurant.reviews.length
        }
      />
    </div>
  );
}
