import Menu from "./menu.js"
import Reviews from "./reviews.js"
import Rate from "./rate.js";


export default function Restaurant (props) {
  return (
    <div key = {props.restaurant.id}>
      <h3>Средняя оценка ресторана по мнению пользователей:
        <Rate stars={avarageRate(props.restaurant.reviews)}/>
      </h3>
      <Menu menu={props.restaurant.menu}/>
      <Reviews reviews={props.restaurant.reviews}/>
    </div>
  )
}

const avarageRate = (reviews) => {
  let rate = reviews.map(review => review.rating);
  let avarage = 0;
  for (let i = 0; i<rate.length; i++) {
    avarage += rate[i];
  }
  avarage = Math.round(avarage/rate.length)
  
  return avarage
}