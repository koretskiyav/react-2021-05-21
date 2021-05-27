import style from './review.module.css';
import Rate from './rate';

export default function Review(props) {
  const { user, text, rating } = props.review
  return <div className={style.review}>
    <Rate rating={rating} />
    <h3>{user ? user : "Incognito"}</h3>
    <p>{text ? text : "No text"}</p>
  </div>
}