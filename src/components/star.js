import { ReactComponent as IconStar } from '../icons/star-svgrepo-com.svg';
import style from './product.module.css';

export default function Star (props){
  const rating = props.value;
  let star = [];
  for (let i = 0; i < rating; ++i) {
      star.push(i)
  }
  let items = star.map(item =>  <IconStar key={item} className={style.icon}/>)

  return <div>{items}</div>;  
}