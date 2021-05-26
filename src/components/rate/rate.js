import { ReactComponent as Star } from '../../icons/star.svg';
import style from './rate.module.css';

const validateRating = (rating) => {
  return Math.floor(rating < 0 ? 0 : rating > 5 ? 5 : rating);
};

export default function Rate({ value }) {
  let stars = [];
  for (let i = 0; i < validateRating(value); i += 1) {
    stars.push(<Star className={style.star} />);
  }

  return (
    <div>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
}
