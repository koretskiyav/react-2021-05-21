import style from './rate.module.css';

import { ReactComponent as Star } from '../../icons/star.svg';

export default function Rate(props) {
  const { value = 0 } = props;

  return (
    <div className={style.container}>
      {Array.from({ length: value }).map((_, index) => (
        <div className={style.star} key={index}>
          <Star />
        </div>
      ))}
    </div>
  );
}
