import style from './review.module.css';

import Rate from '../../rate/rate';

export default function Review(props) {
  const { user = 'Anonymous user', text = '', rating = 5 } = props.review;

  return (
    <div className={style.review}>
      <h3>{user}</h3>
      <p>{text}</p>
      <Rate value={rating} />
    </div>
  );
}
