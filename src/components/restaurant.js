import {useMemo} from 'react';
import Menu from "./menu";
import Reviews from "./reviews";
import Rate from "./rate";

export default function Restaurant(props) {
    let calcAvgRate = useMemo(() => (Math.round(props.restaurant.reviews.reduce((a, review) => a + review.rating, 0) / props.restaurant.reviews.length) || 0),
        [props.restaurant.reviews]);
    return (
        <div>
            <div>Средний рейтинг: <Rate value={calcAvgRate}/></div>
            <Menu menu={props.restaurant.menu}/>
            <Reviews reviews={props.restaurant.reviews}/>
        </div>
    );
}
