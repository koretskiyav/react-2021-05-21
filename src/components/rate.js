import { ReactComponent as Star } from '../icons/star.svg';
import style from './product.module.css';

export default function Rate(props) {
  
  const stars = [];
  for(let i = 1; i<=Math.round(props.value); i++) {
    stars.push(i);
  }
  return (
    <div>
      {stars.map((star) => (
        <Star key={star} className={style.icon} />
      ))}
    </div>
  )
}