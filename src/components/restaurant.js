import Reviews from "./reviews";
import Menu from "./menu";
import Rate from "./rate";

export default function Restaurant(props) {

    return (
        <div>
            <h3>{props.restaurant.name}<Rate rate={3}/></h3>
            <Reviews reviews={props.restaurant.reviews} />
            <Menu menu={props.restaurant.menu} />
        </div>
    );
}
