import Rate from './rate'

export default function Review(props) {
  return (
    <div>
      <h3>{props.user}</h3>
      <div>
        <p>{props.text}</p>
        <Rate value={props.rating} />
      </div>      
    </div>
  )
}