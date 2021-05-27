import style from "./reviews.module.css";
import Rate from "./rate";

export default function Reviews(props) {
    return (
        <div>
            {props.reviews.map((review) => (
                <div className={style.card}>
                    <Rate value={review.rating}/>
                    {review.user}
                    <p className={style['color'+review.rating]}>{review.text} $</p>
                </div>
            ))}
        </div>
    );
}
