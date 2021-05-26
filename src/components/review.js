import Rate from './rate';

import style from './review.module.css';

export default function Review(props) {
  const { user, rating, text } = props.review;

  return (
    <div className={style.review}>
      <p className={style.author}>
        {user} <Rate rating={rating} />
      </p>
      <p>{text}</p>
    </div>
  );
}
