import Menu from './menu';
import Rate from './rate';
import Reviews from './reviews';

function Restaurant(props) {
  const averageRating =
    props.activeRestaurant.reviews.reduce((acc, b) => acc + b.rating, 0) /
    props.activeRestaurant.reviews.length;

  return (
    <div>
      <Menu menu={props.activeRestaurant.menu} />
      <h3>Reviews:</h3>
      <p>Average rating:</p>
      <Rate value={averageRating} />

      <Reviews reviews={props.activeRestaurant.reviews} />
    </div>
  );
}

export default Restaurant;
