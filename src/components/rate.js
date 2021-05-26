import style from './rate.module.css';

import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate(props) {
  let rateStarItems = [];

  for (let index = 0; index < props.value; index++) {
    rateStarItems.push(<Star key={index} className={style.star} />)
  }

  return (
    <span className={style.rateBar}>
      {rateStarItems}
    </span>
  );
}