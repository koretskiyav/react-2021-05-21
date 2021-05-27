import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css';


export default function Rate(props) {
  const {rate} = props;
  let stars=[];

  for (let i = 0; i < rate; i ++ )
  {
    stars.push(
      <div key={i} className={className}>
        <Star className={style.icon}/>
      </div>);
  }

  return (
    <div>
      {stars}
    </div>
    )
}