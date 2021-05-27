import { Fragment } from 'react';
import Menu from './menu';
import Rate from './rate';
import Reviews from './reviews';

function calculateAverage(numbers) {
  if (numbers === null || numbers === undefined || numbers.length === 0) {
    return NaN;
  }

  return numbers.reduce((prev, current) => prev + current) / numbers.length;
}

export default function Restaurant({ restaurant }) {
  if (restaurant === null || restaurant === undefined) {
    return <Fragment>No data</Fragment>;
  }

  // useMemo will not faster: on each render it will compare each rating value with each stored rating value
  // calculate average on each render looks faster
  const averageRating = calculateAverage(
    restaurant.reviews?.map((review) => review.rating)
  );

  return (
    <Fragment key={restaurant.id}>
      <h1>Menu:</h1>
      <Menu menu={restaurant.menu} />

      <h1>Average rating:</h1>
      <Rate rating={averageRating} />

      <h1>Reviews:</h1>
      <Reviews reviews={restaurant.reviews} />
    </Fragment>
  );
}
