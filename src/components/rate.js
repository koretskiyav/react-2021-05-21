import { ReactComponent as Star } from '../icons/star.svg';
import style from './rate.module.css'

function Rate(props) {
  // Создаем массив из пят нулей что б по нему можно было промапится и вывести звезды

const empty=[0,0,0,0,0]

// Мапимся по массиву из пяти нулей ориентируясь на индекс и округляя к ближайшему целому
const starsList = empty.map((star,index) => {
  return (
    <nobr key={index}>
      {index + 1 <= Math.round(props.rating) ? <Star className={style.starGold}/> : <Star className={style.starGray}/>}
    </nobr>
  )
})
  
  return (
    <div className={style.texting}>
      {starsList}
      {props.rating}
    </div>
  );
}
export default Rate;