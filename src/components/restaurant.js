import Menu from './menu';
import Rewiews from './reviews/reviews';
import Rate from './rate/rate';

export default function Restaurant(props) {
  const {
    name = 'Default Name',
    menu = [],
    reviews = [],
  } = props.activeRestaurant;

  const averageRating = reviews.length
    ? Math.floor(
        reviews.reduce((sum, { rating = 0 }) => sum + rating, 0) /
          reviews.length
      )
    : 0;

  return (
    <div>
      <h1>{name}</h1>
      <Menu menu={menu} />
      <Rewiews reviews={reviews} />
      <p>Средний рейтинг: {<Rate value={averageRating} />}</p>
    </div>
  );
}
