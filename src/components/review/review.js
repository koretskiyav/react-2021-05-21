import style from './review.module.css';
import Rate from '../rate';

function Review({ review: { user, text, rating } }) {
  return (
    <div className={style.review}>
      <p>{ user }</p>
      <p>{ text }</p>
      <Rate rate={rating} />
    </div>
  );
}

export default Review;
