import { useMemo } from 'react';
import Menu from './menu';
import Reviews from './reviews';
import Rate from './rate';

export default function Restaurant(props) {
  const ratings = props.restaurant.reviews;
  
  const avg = useMemo(() => {
    if (ratings.length === 0) {
      return 0;
    }
    
    return ratings.reduce((sum, item) => sum + item.rating, 0) / ratings.length;
  }, [ratings])
  
  return (
    <div>
      
      <Menu menu={props.restaurant.menu} />
      <h2> Рейтинг: {avg.toFixed(1)} </h2>
      <Rate value={avg} />
      <Reviews reviews={props.restaurant.reviews} />
    </div>
  )
}