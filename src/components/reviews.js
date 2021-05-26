import Rate from './rate';

import style from './reviews.module.css';

export default function Reviews(props) {
  return (
    <div>
      {props.reviews.map((review) => {
        return (
          <div className={style.card}>
            <p className={style.user}>{review.user}</p>
            <p>{review.text}</p>
            <Rate rating={review.rating} />
          </div>
        );
      })}
    </div>
  );
}
