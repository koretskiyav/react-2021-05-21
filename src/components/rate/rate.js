import { ReactComponent as Star } from '../../icons/star.svg';

import style from './rate.module.css';

function Rate({ rate }) {
  const totalStars = 5;

  return (
    <div className={style.wrapper}>
      { (new Array(totalStars).fill('')).map((star, i) => {
        if (i < rate) {
          return <Star className={`${style.star} ${style['star--active']}`} key={i} />
        }

        return <Star className={style.star} key={i} />
      }) }
    </div>
  );
};

export default Rate;
