import Rate from './rate'

import style from './review.module.css';

export default function Review(props) {
  return (
      <div className={style.rate}>
            <Rate rate={props.review.rating} />
            <b>{props.review.user}</b>
            <p>{props.review.text}</p>
      </div>
  );
}
