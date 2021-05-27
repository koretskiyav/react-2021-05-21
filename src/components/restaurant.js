import { useMemo } from "react";
import Menu from "./menu";
import Reviews from "./reviews";

function Restaurant(props) {
  const activeRestaurant = useMemo(
    () => props.restorants.find((restaurant) => restaurant.id === props.restorantId),
    [props.restorantId, props.restorants]
  );

  return (
    <div>
      <Menu menu={activeRestaurant.menu} />
      <Reviews reviews={activeRestaurant.reviews}/>
    </div>
  );
}
export default Restaurant;