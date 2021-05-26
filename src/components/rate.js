import { Fragment } from 'react';

import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css';

export default function Rate({ value: rating }) {
  if (rating === null || rating === undefined || Number.isNaN(rating)) {
    return 'No value';
  }

  const starKeys = [...Array(Math.floor(rating)).keys()];

  // TODO: show half of star ?

  return (
    <Fragment>
      {starKeys.map((key) => (
        <Star key={key} className={style.star} />
      ))}
      ({rating})
    </Fragment>
  );
}
