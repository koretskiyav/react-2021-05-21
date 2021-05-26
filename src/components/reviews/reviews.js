import Rate from '../rate/rate';
import style from './reviews.module.css';

export default function Reviews({ reviews }) {
  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map((review) => (
        <div className={style.card} key={review.id}>
          <h3>{review.user}</h3>
          <p> {review.text}</p>
          <Rate value={review.rating} />
        </div>
      ))}
    </div>
  );
}
