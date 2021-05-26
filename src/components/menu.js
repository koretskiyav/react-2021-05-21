import Product from './product';

export default function Menu(props) {
  return (
    <div>
      <h3>Restaurant Menu</h3>
      {props.menu.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
