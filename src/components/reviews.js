import Rate from './rate';
import style from './reviews.module.css';

export default function Reviews({ reviews }) {
  return reviews.map((review, index) => (
    <div key={review.id} className={style.review}>
      <div>Author: {review.user}</div>
      <div>Text: {review.text}</div>
      <div>
        Rating: <Rate value={review.rating} />
      </div>
    </div>
  ));
}
