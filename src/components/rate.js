import { ReactComponent as Star } from '../icons/star.svg';
import style from './product.module.css';

export default function Rate(props) {
  const {rate}=props;
  let content=[];

  for(let i=1; i< rate; i++)
  {
    content.push(<Star className={style.icon}/>);
  }

  return content;
}