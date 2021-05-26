import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css';

export default function Rate(props) {
  let starItems = [];

  for (let index = 0; index < props.value; index++) {
    starItems.push(<Star key={index} className={style.star}/>)
  }

  return (
    <span>
      {starItems}
    </span>
  );
}