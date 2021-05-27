import style from './rate.module.css';

import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate(props) {
  const maxRateValue = 5;
  let rateStarItems = [];

  for (let index = 0; index < maxRateValue; index++) {
    rateStarItems.push(<Star key={index} className={(index < props.value) ? style['star--active'] : style.star} />)
  }

  return (
    <span className={style.rateBar}>
      {rateStarItems}
    </span>
  );
}