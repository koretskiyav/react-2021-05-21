import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css';

function Rate(props) {
  const empty = [0, 0, 0, 0, 0];

  const starsList = empty.map((star, index) => {
    return (
      <nobr key={index}>
        {index + 1 <= Math.round(props.rating) ? (
          <Star className={style.starGold} />
        ) : (
          <Star className={style.starGray} />
        )}
      </nobr>
    );
  });

  return (
    <div className={style.texting}>
      {starsList}
      {props.rating}
    </div>
  );
}
export default Rate;
