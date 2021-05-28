import style from './rate.module.css';

import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate(props) {
  const maxRateValue = 5;
  const rateStarItems = ([...Array(maxRateValue).keys()]).map(index => <Star key={index} className={(index < props.value) ? style['star--active'] : style.star} />);

  return (
    <span className={style.rateBar}>
      {rateStarItems}
    </span>
  );
}