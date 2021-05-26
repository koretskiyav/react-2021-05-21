import React from 'react';

import { ReactComponent as StarEmpty } from '../icons/star-empty.svg';
import { ReactComponent as StarFilled } from '../icons/star-filled.svg';

import style from './rate.module.css';

export default function Rate(props) {
  const { maxRating = 5 } = props;

  return (
    <>
      {Array(maxRating)
        .fill(<React.Fragment />)
        .map((_, index) =>
          index + 1 <= props.rating ? (
            <StarFilled key={index} className={style.star} />
          ) : (
            <StarEmpty key={index} className={style.star} />
          )
        )}
    </>
  );
}
