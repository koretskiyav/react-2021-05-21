import style from './product.module.css';

import { ReactComponent as Star } from '../icons/star.svg';
import { ReactComponent as EmptyStar } from '../icons/emptyStar.svg';


export default function Rate(props) {
  let arr = new Array(5).fill(null);
  for (let i = 0; i < 5; i++){
    if (i < props.stars) {
      arr[i] = true;
    }
    else {
      arr[i] = false;
    }
  }
  return ( 
    <div>
      {arr.map((val, index) => 
      val === true ? <Star className={style.star} key={index}/> 
                   : <EmptyStar className={style.emptyStar} key={index}/>
    )
    }
    </div>
  );
};



