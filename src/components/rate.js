import React from 'react';
import style from './rate.module.css';
import { ReactComponent as Star } from '../icons/star.svg';

export default function Rate({ rating, maxRating = 5 }) {

  const generateStars = () => {
    const stars = [];
    for (let i = 1; i<=maxRating; i++) {
      stars.push(<Star key={i} className={i<=rating ? style.active : style.inactive}/>)
    }
    return(stars);
  }

  return <div>
    {generateStars().map(star => star)}
  </div>
}