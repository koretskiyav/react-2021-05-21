import { Fragment } from 'react';

import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css';

export default function Rate({ rating }) {
  if (rating === null || rating === undefined || Number.isNaN(rating)) {
    return 'No value';
  }

  const starKeys = [...Array(Math.floor(rating)).keys()];

  // TODO: always show empty stars?
  // TODO: show half of star?
  // TODO: round average rating to near integer and show stars (Math.round)?
  // TODO: paint stars exactly by rating?

  return (
    <Fragment>
      {starKeys.map((key) => (
        <Star key={key} className={style.star} />
      ))}
      ({rating.toPrecision(2)})
    </Fragment>
  );
}
