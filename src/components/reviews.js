import s from './reviews.module.css';
import { useMemo } from 'react';
import Rate from './rate';

export default function Reviews(props) {
  const { reviews } = props;

  const avgRating = useMemo(() => {
    const sum = reviews.reduce((acc, { rating }) => acc + rating, 0);
    return Math.floor(sum / reviews.length);
  }, [reviews]);

  return (
    <>
      {
        reviews.map(item =>
          <div className={s.card} key={item.id}>
            <div className='user__container'>
              <p>{item?.user}</p>
              <p>{item?.text}</p>
            </div>
            <div className='rate__container'>
              <Rate value={item.rating} />
            </div>
          </div>
        )
      }
      <h1>Рейтинг</h1>
      <Rate value={avgRating} />
    </>
  );
}
