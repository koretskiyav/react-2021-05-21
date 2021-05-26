import { ReactComponent as Star } from '../icons/star.svg';

import style from './rate.module.css';

export default function Rate(props) {
  let stars = [];

  for(let i = 0; i < 5; i++) {
    let className = style.star;

    if(i >= props.value) {      
      className += ` ${style.empty}`;
    } 
    stars.push(<div key={i} className={className}><Star /></div>);    
  }

  return (
    <div>  
      {stars}      
    </div>
  )
}