import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

import style from './product.module.css';

export default function Restaurant(props) {
  let averageRating = (elem) => {
    let rating = elem.map((el) => el.rating);
    let sum = 0;
    for (let i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    sum = Math.round(sum / rating.length);

    return sum;
  };

  return (
    <div className={style.card}>
      <p>
        Restaurant name: <strong>{props.restaurant.name}</strong>
      </p>
      <p>
        Average Restaurant Rating:
        <Rate review={averageRating(props.restaurant.reviews)} />
      </p>

      <p>Restaurant Menu</p>
      <Menu menu={props.restaurant.menu} />
      <p>Restaurant Reviews</p>
      <Reviews reviews={props.restaurant.reviews} />
    </div>
  );
}
