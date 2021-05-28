import Rate from "./rate";

import style from './review.module.css';

export default function Review(props) {
  return (
    <div className={style.review}>
      <div className={style.reviewHeader}>
        <b>{props.review.user}</b>
        <Rate value={props.review.rating} />
      </div>
      <p className={style.reviewBody}>{props.review.text}</p>
    </div>
  );
} 