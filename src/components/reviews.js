import Review from './review';
import style from './review.module.css';

export default function Reviews(props) {
  return <div className={style.reviews}>
    {props.reviews.map((review) => <Review key={review.id} review={review} />)}
  </div>
}