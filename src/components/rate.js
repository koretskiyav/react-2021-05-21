import { ReactComponent as Star } from '../icons/star-svg.svg';
import style from './product.module.css';

export default function Rate(props) {
  let getStars = (elem) => {
    let arrStars = [];
    for (let i = 0; i < elem; i++) {
      arrStars.push(<Star className={style.star} />);
    }
    return arrStars;
  };

  return <p>{getStars(props.review)}</p>;
}
