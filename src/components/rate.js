import { useEffect, useState } from 'react';
import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css'

function Rate(props) {
const empty=[0,0,0,0,0]

const starsList = empty.map((star,index) => {
  return (
    <>
      {index + 1 <= Math.round(props.rating) ? <Star className={style.starGold}/> : <Star className={style.starGray}/>}
    </>
  )
})
  
  return (
    <div>
      {starsList}
      {props.rating}
    </div>
  );
}
export default Rate;