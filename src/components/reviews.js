import s from './reviews.module.css';
import Rate from './rate';

export default function Reviews(props) {
  const { reviews } = props;
  let result = 0;

  reviews.forEach(item => result += item.rating);

  const avgRating = Math.floor(result / reviews.length);

  return (
    <>
      {
        reviews.map(item =>
          <div className={s.card} key={item.id}>
            <p>{item?.user}</p>
            <p>{item?.text}</p>
          </div>
        )
      }
      <h1>Рейтинг</h1>
      <Rate value={avgRating} />
    </>
  );
}
