import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

import style from './restaurant.module.css';

export default function Restaurant(props) {
  const averageRating = useMemo(() => {
    const total = props.restaurant.reviews.reduce(
      (acc, { rating }) => acc + rating,
      0
    );
    return Math.round(total / props.restaurant.reviews.length);
  }, [props.restaurant.reviews]);

  return (
    <>
      <div className={style.block}>
        <h3>Рейтинг ресторана:</h3> <Rate rating={averageRating} />
      </div>
      <div className={style.block}>
        <h3>Меню:</h3> <Menu menu={props.restaurant.menu} />
      </div>
      <div className={style.block}>
        <h3>Отзывы:</h3> <Reviews reviews={props.restaurant.reviews} />
      </div>
    </>
  );
}
