export default function Navigation(props) {
  return (
    <div>
      {props.restaurants.map((restaurant) => (
        <button
          key={restaurant.id}
          onClick={() => props.onRestaurantClick(restaurant.id)}
        >
          asdasdasdasdads
          {restaurant.name}
        </button>
      ))}
    </div>
  );
}
