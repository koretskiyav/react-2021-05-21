import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant(props) {
  const { reviews, menu } = props;

  const totalRating = reviews.reduce((accum, review) => {
    accum += review.rating;
    return accum;
  }, 0);
  const averageRating = Math.round(totalRating / reviews.length);

  return (
    <div>
      <Menu menu={menu} />
      <h3>
        Reviews <Rate rating={averageRating} />
      </h3>
      <Reviews reviews={reviews} />
    </div>
  );
}
