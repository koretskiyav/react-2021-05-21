import Menu from '../menu/menu';
import Rate from '../rate/rate';
import Reviews from '../reviews/reviews';
import style from './restaurant.module.css';

export default function Restaurant({ menu, reviews }) {
  let totalStars = reviews.reduce((acc, review) => {
    return acc + review.rating;
  }, 0);

  let amountOfReviews = reviews.reduce((acc, review) => {
    return acc + 1;
  }, 0);

  return (
    <div>
      <h3 className={style.card}>
        Average rating: <Rate value={totalStars / amountOfReviews} />
      </h3>
      <Menu menu={menu} />
      <Reviews reviews={reviews} />
    </div>
  );
}
