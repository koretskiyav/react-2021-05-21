export default function Navigation(props) {
  console.log(props);
  return (
    <div>
      {props.restaurants.map((restaurant) => (
        <button
          key={restaurant.id}
          onClick={() => props.onRestaurantClick(restaurant.id)}
        >
          {restaurant.name}
        </button>        
      ))}
    </div>
  );
}
