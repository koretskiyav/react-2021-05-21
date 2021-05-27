import Product from './product';
import Feedback from "./feedback";
export default function Menu(props) {  
  let arrayRating = [];
  props.reviews.map( review => arrayRating.push(review.rating))
  let result = arrayRating.reduce(function(sum, current) {
    return sum + current;
  }, 0);
  let averageRating = result/arrayRating.length;  
  return (
    <div>      
      <strong>Средний рейтинг нашего ресторана<hr></hr>{averageRating.toFixed(1)}<br></br></strong>
            
      <strong>Отзывы наших покупателей</strong>
      <hr></hr>
      {props.reviews.map( (feedback) => (        
        //рендерим компонент Feedback и передаём пропсу(props) feedback
        <Feedback key={feedback.id} feedback={feedback}/>        
      ))}
      <strong>Меню нашего ресторана</strong>
      <hr></hr>
      {props.menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
