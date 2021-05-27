import React from 'react'

import style from './rate.module.css';

import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate(props) {

  const stars = [];
  for (let i = 0; i < props.value; i++) {
      stars.push(<Star className = {style.icon} key={i} />);
  }

  return (
    <div>
      {stars}
    </div>
  )
}

