import Rate from './rate'

export default function Reviews(props) {

  const {user, text, rating} = props.review

  return (
    <div>
    <p>{user}</p>
    <p>{text}</p>
    <Rate value={rating}/>
    </div>
  );
}