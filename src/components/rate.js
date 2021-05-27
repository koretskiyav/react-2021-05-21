import style from './rate.module.css';
import { ReactComponent as Star } from '../icons/star.svg';

function Rate(props) {
  const stars = Array.from({ length: props.value }, (_, i) => i + 1);

  return (
    <div className={style.stars}>
      {stars.map((star) => (
        <Star className={style.star} key={star} />
      ))}
    </div>
  );
}

export default Rate;
