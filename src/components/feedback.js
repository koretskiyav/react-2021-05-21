
import Star from "./star";
export default function Feedback (props) {
  return (
  <div>    
    <p>{props.feedback.user}</p>
    <p>{props.feedback.text}</p>
    <Star key={props.feedback.id} value={props.feedback.rating}/>
  </div>
  );
}