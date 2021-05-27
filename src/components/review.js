import Rate from './rate'

export default function Review(props){
  return (
    <div>
      <h2>{props.user}</h2>
      <p>
        {props.text}
      </p>
      <Rate rate = {props.rating}/>
    </div>
  );
}