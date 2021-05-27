import style from './reviews.module.css';

import Review from './review/review';

export default function Reviews(props) {
  const { reviews = [] } = props;

  return (
    <div className={style.reviews}>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
}
